import transporter from '../config/nodemailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 254, company: 150, phone: 30, message: 5000 }

// Stop user input from injecting HTML into the email
const escapeHtml = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const clean = (v) => (typeof v === 'string' ? v.trim() : '')

const validate = ({ name, email, company, phone, message }) => {
  const errors = {}
  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(email)) errors.email = 'That email doesn’t look right.'
  if (!message) errors.message = 'Please tell us how we can help.'

  const fields = { name, email, company, phone, message }
  for (const [key, max] of Object.entries(LIMITS)) {
    if (fields[key].length > max) errors[key] = `${key[0].toUpperCase() + key.slice(1)} is too long (max ${max} characters).`
  }
  return errors
}

const row = (label, value) =>
  value
    ? `<tr>
         <td style="padding:8px 12px;font-weight:bold;color:#7F1D1D;white-space:nowrap;vertical-align:top">${label}</td>
         <td style="padding:8px 12px;color:#111">${value}</td>
       </tr>`
    : ''

// POST /api/contact  { name, email, company?, phone?, message, website? }
// Responds { ok: true } or { ok: false, error?, errors? } — the shape Contact.jsx expects
export const sendContactMessage = async (req, res) => {
  const body = req.body ?? {}

  // Honeypot: real users never see the "website" field, bots fill it in.
  // Pretend it worked so the bot moves on.
  if (clean(body.website)) return res.status(200).json({ ok: true })

  const data = {
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    phone: clean(body.phone),
    message: clean(body.message),
  }

  const errors = validate(data)
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors })
  }

  const safe = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, escapeHtml(v)]))
  const inbox = process.env.CONTACT_TO || process.env.EMAIL_USER

  try {
    // 1) The enquiry, to the Hakirush team. Hitting "Reply" goes to the visitor.
    await transporter.sendMail({
      from: `"Hakirush Website" <${process.env.EMAIL_USER}>`,
      to: inbox,
      replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
      subject: `New contact enquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
      text:
        [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.company && `Company: ${data.company}`,
          data.phone && `Phone: ${data.phone}`,
        ]
          .filter(Boolean)
          .join('\n') + `\n\n${data.message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
          <div style="background:#DC2626;color:#fff;padding:16px 20px;font-size:18px;font-weight:bold">New Contact Enquiry</div>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${row('Name', safe.name)}
            ${row('Email', `<a href="mailto:${safe.email}">${safe.email}</a>`)}
            ${row('Company', safe.company)}
            ${row('Phone', safe.phone)}
          </table>
          <div style="padding:16px 20px;border-top:1px solid #eee">
            <div style="font-weight:bold;color:#7F1D1D;margin-bottom:8px">Message</div>
            <div style="white-space:pre-wrap;color:#111;line-height:1.5">${safe.message}</div>
          </div>
        </div>
      `,
    })

    // 2) Confirmation to the visitor. If this one fails, the enquiry still went through.
    transporter
      .sendMail({
        from: `"Hakirush" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'We got your message — Hakirush',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
            <h2 style="color:#DC2626">Thanks for reaching out, ${safe.name}!</h2>
            <p>We've received your message and our team will get back to you within one business day.</p>
            <p style="color:#555;border-left:3px solid #DC2626;padding-left:12px;white-space:pre-wrap">${safe.message}</p>
            <p>— Team Hakirush</p>
          </div>
        `,
      })
      .catch((err) => console.error('Auto-reply failed:', err.message))

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err)
    return res.status(500).json({ ok: false, error: 'Could not send your message right now.' })
  }
}