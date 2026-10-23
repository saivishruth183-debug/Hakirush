import 'dotenv/config' // load .env before reading EMAIL_USER / EMAIL_PASS
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
})


transporter
  .verify()
  .then(() => console.log('Mail server ready'))
  .catch((err) => console.error('Mail server error:', err.message))

export default transporter