import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '465',
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
  ALLOWED_ORIGINS = 'https://hakirush-1.vercel.app',
  PORT = '5000',
  AUTO_REPLY = 'false',
  DRY_RUN = 'false',
} = process.env

const dryRun = DRY_RUN === 'true'

if (!dryRun && (!SMTP_USER || !SMTP_PASS)) {
  console.error('✖ SMTP_USER and SMTP_PASS must be set in Backend/.env')
  process.exit(1)
}

const port = Number(SMTP_PORT)
const transporter = dryRun
  ? nodemailer.createTransport({ jsonTransport: true }) 
  : nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, 
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS.replace(/\s+/g, ''), 
      },
    })

if (!dryRun) {
  transporter
    .verify()
    .then(() => console.log(`✔ SMTP login OK as ${SMTP_USER}`))
    .catch((err) => console.error('✖ SMTP login failed — check SMTP_USER / SMTP_PASS:', err.message))
}

/* ---------------- app ---------------- */

const app = express()
app.set('trust proxy', 1) // correct client IPs behind Render/Railway/Nginx (for rate limiting)
app.use(express.json({ limit: '20kb' }))

const origins = ALLOWED_ORIGINS.split(',').map((s) => s.trim().replace(/\/+$/, '')).filter(Boolean)
app.use(
  cors({
    origin: (origin, cb) => (!origin || origins.includes(origin) ? cb(null, true) : cb(new Error('Origin not allowed'))),
    methods: ['POST', 'GET'],
  }),
)

// max 5 enquiries per visitor every 15 minutes — stops spam floods
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages. Please try again in a few minutes.' },
})

/* ---------------- helpers ---------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 200, company: 150, phone: 40, message: 5000 }

const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const oneLine = (v) => v.replace(/[\r\n]+/g, ' ') // no header injection via name/subject
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const row = (label, value) => `
  <tr>
    <td style="padding:10px 14px;background:#141414;color:#9CA3AF;font-size:12px;text-transform:uppercase;letter-spacing:.12em;width:120px;vertical-align:top">${label}</td>
    <td style="padding:10px 14px;background:#0f0f0f;color:#F5F3EC;font-size:14px">${value}</td>
  </tr>`

const adminHtml = (d, when) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;padding:24px">
    <div style="max-width:620px;margin:0 auto;border:1px solid #262626;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#DC2626,#7F1D1D);padding:18px 22px">
        <div style="color:#fff;font-size:11px;letter-spacing:.3em;text-transform:uppercase;opacity:.85">HAKIRUSH · Website enquiry</div>
        <div style="color:#fff;font-size:20px;font-weight:700;margin-top:6px">New message from ${escapeHtml(d.name)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', escapeHtml(d.name))}
        ${row('Email', `<a href="mailto:${escapeHtml(d.email)}" style="color:#F87171">${escapeHtml(d.email)}</a>`)}
        ${row('Company', escapeHtml(d.company || 'Not provided'))}
        ${row('Phone', d.phone ? `<a href="tel:${escapeHtml(d.phone.replace(/\s/g, ''))}" style="color:#F87171">${escapeHtml(d.phone)}</a>` : 'Not provided')}
        ${row('Message', escapeHtml(d.message).replace(/\n/g, '<br>'))}
        ${row('Received', escapeHtml(when))}
      </table>
      <div style="padding:14px 22px;background:#111;color:#6B7280;font-size:12px">Just hit <b>Reply</b> — it goes straight to ${escapeHtml(d.email)}.</div>
    </div>
  </div>`

const replyHtml = (d) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
    <p>Hi ${escapeHtml(d.name.split(' ')[0])},</p>
    <p>Thanks for reaching out to <b>HAKIRUSH</b>. We've received your message and our team will get back to you within one business day.</p>
    <p style="color:#555;border-left:3px solid #DC2626;padding-left:12px;white-space:pre-wrap">${escapeHtml(d.message)}</p>
    <p>— Team HAKIRUSH</p>
  </div>`

/* ---------------- routes ---------------- */

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body || {}

  // honeypot: real people never see or fill the "website" field; bots do
  if (body.website) return res.json({ ok: true })

  const d = {
    name: oneLine(clean(body.name, LIMITS.name)),
    email: oneLine(clean(body.email, LIMITS.email)),
    company: oneLine(clean(body.company, LIMITS.company)),
    phone: oneLine(clean(body.phone, LIMITS.phone)),
    message: clean(body.message, LIMITS.message),
  }

  const errors = {}
  if (!d.name) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(d.email)) errors.email = 'Please enter a valid email.'
  if (!d.message) errors.message = 'Please tell us how we can help.'
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
  const fromAddress = SMTP_USER || 'no-reply@hakirush.com'

  try {
    const info = await transporter.sendMail({
      from: `"HAKIRUSH Website" <${fromAddress}>`, // Gmail requires the sender to be the logged-in account
      to: MAIL_TO || fromAddress,
      replyTo: `"${d.name.replace(/"/g, '')}" <${d.email}>`,
      subject: `New enquiry from ${d.name}${d.company ? ` · ${d.company}` : ''}`,
      text: [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Company: ${d.company || 'Not provided'}`,
        `Phone: ${d.phone || 'Not provided'}`,
        `Received: ${when}`,
        '',
        'Message:',
        d.message,
      ].join('\n'),
      html: adminHtml(d, when),
    })
    if (dryRun) console.log('DRY RUN — email that would be sent:\n', info.message.toString())

    if (AUTO_REPLY === 'true') {
      // a failed confirmation shouldn't fail the enquiry itself
      transporter
        .sendMail({
          from: `"HAKIRUSH" <${fromAddress}>`,
          to: d.email,
          subject: 'We received your message — HAKIRUSH',
          text: `Hi ${d.name},\n\nThanks for reaching out to HAKIRUSH. We've received your message and will get back to you within one business day.\n\n— Team HAKIRUSH`,
          html: replyHtml(d),
        })
        .catch((err) => console.error('Auto-reply failed:', err.message))
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('Send failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Could not send your message right now.' })
  }
})

// CORS rejections and bad JSON land here
app.use((err, _req, res, _next) => {
  res.status(err.message === 'Origin not allowed' ? 403 : 400).json({ ok: false, error: err.message })
})

app.listen(Number(PORT), () => console.log(`✔ Contact mailer running on http://localhost:${PORT}${dryRun ? ' (DRY RUN)' : ''}`))
