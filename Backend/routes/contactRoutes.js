import express from 'express'
import rateLimit from 'express-rate-limit'
import { sendContactMessage } from '../controller/contactController.js'

const router = express.Router()

// Max 5 messages per IP every 15 minutes, so the form can't be used to spam your Gmail
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again in a few minutes.' },
})

router.post('/', contactLimiter, sendContactMessage)

export default router