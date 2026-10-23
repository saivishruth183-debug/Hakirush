import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRoutes from './routes/contactRoutes.js'
import mailRoutes from './routes/mailRoutes.js'

const app = express()

// Allow the React site to call this API (comma-separated list in CLIENT_URL)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))

app.set('trust proxy', 1) // correct client IPs for the rate limiter behind Render/Vercel/Nginx
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/contact', contactRoutes)
app.use('/api/mail', mailRoutes)

export default app