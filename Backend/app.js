const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------------------------------------------------------ */
/*  CORS                                                               */
/* ------------------------------------------------------------------ */
// Production site + local dev servers. Add more via CORS_ORIGINS (comma-separated).
const DEFAULT_ORIGINS = [
    'https://hakirush1-orcin.vercel.app',
    'http://localhost:5173', // Vite
    'http://localhost:3000', // CRA / Next
    'http://127.0.0.1:5173',
];

const allowedOrigins = [
    ...DEFAULT_ORIGINS,
    ...(process.env.CORS_ORIGINS || '')
        .split(',')
        .map((o) => o.trim().replace(/\/$/, '')) // a trailing slash would never match
        .filter(Boolean),
];

const corsOptions = {
    origin(origin, callback) {
        // No origin = Postman, curl, server-to-server: allow
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Vercel preview deployments, e.g. https://hakirush1-orcin-git-main-xyz.vercel.app
        if (/^https:\/\/hakirush1-orcin(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) return callback(null, true);
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // also answers browser preflight (OPTIONS) requests

app.use(express.json({ limit: '50kb' }));

/* ------------------------------------------------------------------ */
/*  MAIL                                                               */
/* ------------------------------------------------------------------ */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape user input so it can't inject HTML into the email
const escapeHtml = (str = '') =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Mail format: returns an HTML string
const mailHtml = (name, email, company, phone, message) => `
    <div>
        <h2>Web Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || '-')}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || '-')}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    </div>
`;

/* ------------------------------------------------------------------ */
/*  ROUTES                                                             */
/* ------------------------------------------------------------------ */
app.get('/', (req, res) => res.json({ ok: true, service: 'hakirush-backend' }));

app.get('/api/health', (req, res) =>
    res.json({
        ok: true,
        emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    })
);

app.post('/api/contact', async (req, res) => {
    const { name, email, company = '', phone = '', message, website = '' } = req.body || {};

    // Honeypot: real visitors never fill this hidden field, bots do.
    if (website) {
        return res.status(200).json({ ok: true, message: 'Email sent successfully' });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
    }
    if (!EMAIL_RE.test(email.trim())) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('EMAIL_USER / EMAIL_PASS are not set');
        return res.status(500).json({ ok: false, error: 'Mail service is not configured.' });
    }

    const mailOptions = {
        from: `"Hakirush Website" <${process.env.EMAIL_USER}>`,
        replyTo: email.trim(),
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name.trim()}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nPhone: ${phone || '-'}\nMessage: ${message}`,
        html: mailHtml(name.trim(), email.trim(), String(company).trim(), String(phone).trim(), message.trim()),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ ok: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ ok: false, error: 'Failed to send email. Please try again later.' });
    }
});

// 404 + error handler: always reply with JSON (the form expects JSON)
app.use((req, res) => res.status(404).json({ ok: false, error: 'Not found' }));
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.message?.includes('CORS') ? 403 : 500;
    res.status(status).json({ ok: false, error: err.message || 'Server error' });
});

/* ------------------------------------------------------------------ */
/*  START                                                              */
/* ------------------------------------------------------------------ */
// Local: `node app.js` starts a server. Vercel: imports the app as a serverless function.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;