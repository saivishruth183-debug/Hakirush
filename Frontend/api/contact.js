import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 200, company: 150, phone: 40, message: 5000 }

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const oneLine = (value) => value.replace(/[\r\n]+/g, ' ')
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

const row = (label, value) => `
  <tr>
    <td style="padding:10px 14px;background:#141414;color:#9CA3AF;font-size:12px;text-transform:uppercase;letter-spacing:.12em;width:120px;vertical-align:top">${label}</td>
    <td style="padding:10px 14px;background:#0f0f0f;color:#F5F3EC;font-size:14px">${value}</td>
  </tr>`

const enquiryHtml = (data, received) => `
  <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:24px">
    <div style="max-width:620px;margin:0 auto;border:1px solid #262626;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#DC2626,#7F1D1D);padding:18px 22px">
        <div style="color:#fff;font-size:11px;letter-spacing:.3em;text-transform:uppercase">HAKIRUSH · Website enquiry</div>
        <div style="color:#fff;font-size:20px;font-weight:700;margin-top:6px">New message from ${escapeHtml(data.name)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', escapeHtml(data.name))}
        ${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:#F87171">${escapeHtml(data.email)}</a>`)}
        ${row('Company', escapeHtml(data.company || 'Not provided'))}
        ${row('Phone', escapeHtml(data.phone || 'Not provided'))}
        ${row('Message', escapeHtml(data.message).replace(/\n/g, '<br>'))}
        ${row('Received', escapeHtml(received))}
      </table>
    </div>
  </div>`

export default async function contact(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}
  if (body.website) return res.status(200).json({ ok: true })

  const data = {
    name: oneLine(clean(body.name, LIMITS.name)),
    email: oneLine(clean(body.email, LIMITS.email)),
    company: oneLine(clean(body.company, LIMITS.company)),
    phone: oneLine(clean(body.phone, LIMITS.phone)),
    message: clean(body.message, LIMITS.message),
  }

  const errors = {}
  if (!data.name) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email.'
  if (!data.message) errors.message = 'Please tell us how we can help.'
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  const { RESEND_API_KEY, MAIL_TO, MAIL_FROM } = process.env
  if (!RESEND_API_KEY || !MAIL_TO || !MAIL_FROM) {
    console.error('Contact API is missing RESEND_API_KEY, MAIL_TO, or MAIL_FROM.')
    return res.status(503).json({ ok: false, error: 'The contact form email service is not configured.' })
  }

  const received = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || 'Not provided'}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Received: ${received}`,
    '',
    'Message:',
    data.message,
  ].join('\n')

  try {
    const resend = new Resend(RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: data.email,
      subject: `New enquiry from ${data.name}${data.company ? ` · ${data.company}` : ''}`,
      text,
      html: enquiryHtml(data, received),
    })

    if (error) {
      console.error('Contact email delivery failed:', error.message)
      return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact email delivery failed:', error.message)
    return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
  }
}
