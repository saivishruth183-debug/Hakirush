const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Locally this loads .env. On Vercel there is no .env file — the values come
// from Project Settings → Environment Variables instead, so a missing file is fine.
try {
    require('dotenv').config({ quiet: true });
} catch {
    /* dotenv not needed in production */
}

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------------------------------------------------------ */
/*  CORS                                                               */
/* ------------------------------------------------------------------ */
// Production site + local dev servers. Add more via CORS_ORIGINS (comma-separated).
const DEFAULT_ORIGINS = [
    'https://hakirush1-orcin.vercel.app',
    'https://hakirush.com',
    'https://www.hakirush.com',
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
    credentials: true,
    origin(origin, callback) {
        // No origin = Postman, curl, server-to-server, opening the URL in a browser tab: allow
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Vercel preview deployments, e.g. https://hakirush1-orcin-git-main-xyz.vercel.app
        if (/^https:\/\/hakirush1-orcin(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) return callback(null, true);
        console.warn(`Blocked by CORS: ${origin}`);
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // also answers browser preflight (OPTIONS) requests
app.use(express.json({ limit: '50kb' }));

/* ------------------------------------------------------------------ */
/*  MAIL                                                               */
/* ------------------------------------------------------------------ */
// Created lazily so a missing env var never crashes the function at startup.
let transporter = null;
const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // fail fast instead of hanging until the serverless function times out
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
        });
    }
    return transporter;
};

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
app.get('/api', (req, res) => res.json({ ok: true, service: 'hakirush-backend' }));

// Open this in a browser after deploying to check the setup
app.get('/api/health', (req, res) =>
    res.json({
        ok: true,
        emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        node: process.version,
        allowedOrigins,
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
        console.error('EMAIL_USER / EMAIL_PASS are not set in Vercel Environment Variables');
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
        const info = await getTransporter().sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return res.status(200).json({ ok: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error.code, error.message);
        transporter = null; // rebuild the connection on the next request
        const authFailed = error.code === 'EAUTH';
        return res.status(500).json({
            ok: false,
            error: authFailed
                ? 'Mail login failed. Check EMAIL_USER / EMAIL_PASS (Gmail app password).'
                : 'Failed to send email. Please try again later.',
        });
    }
});

// 404 + error handler: always reply with JSON (the form expects JSON)
app.use((req, res) => res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.originalUrl}` }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.message?.includes('CORS') ? 403 : err.status || 500;
    res.status(status).json({ ok: false, error: err.message || 'Server error' });
});

/* ------------------------------------------------------------------ */
/*  START                                                              */
/* ------------------------------------------------------------------ */
// Local: `npm start` / `node app.js` starts a server.
// Vercel: api/index.js imports this app as a serverless function (no listen()).
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;