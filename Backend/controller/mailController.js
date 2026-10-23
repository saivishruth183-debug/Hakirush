import transporter from '../config/nodemailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// POST /api/mail/subscribe  { email }
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body ?? {}

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email.' })
  }

  try {
    await transporter.sendMail({
      from: `"Hakirush" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Hakirush 🚀',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto">
          <h2>You're in!</h2>
          <p>Thanks for subscribing to the Hakirush newsletter.
          We'll keep you posted on events, deadlines and sponsors.</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true, message: 'Subscribed! Check your inbox.' })
  } catch (err) {
    console.error('sendMail failed:', err)
    return res.status(500).json({ success: false, message: 'Could not send email. Try again later.' })
  }
}