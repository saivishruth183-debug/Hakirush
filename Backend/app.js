const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
    const { name, email, company = '', phone = '', message, website = '' } = req.body || {};

    // Honeypot: real visitors never fill this hidden field, bots do.
    // Pretend success so bots don't retry.
    if (website) {
        return res.status(200).json({ ok: true, message: 'Email sent successfully' });
    }

    // Name, email and message are required; company and phone are optional (matches the form)
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
    }
    if (!EMAIL_RE.test(email.trim())) {
        return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    const mailOptions = {
        from: `"Hakirush Website" <${process.env.EMAIL_USER}>`,
        replyTo: email.trim(),
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name.trim()}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nPhone: ${phone || '-'}\nMessage: ${message}`,
        html: mailHtml(name.trim(), email.trim(), company.trim(), phone.trim(), message.trim()),
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});