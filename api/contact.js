import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const textValue = (value, maxLength) => String(value || "").trim().slice(0, maxLength);
const messageText = ({ name, email, company, phone, message }) => [
  `Name: ${name}`,
  `Email: ${email}`,
  `Company: ${company || "Not provided"}`,
  `Phone: ${phone || "Not provided"}`,
  "",
  "Message:",
  message,
].join("\n");

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
  } catch {
    return response.status(400).json({ error: "Invalid request body" });
  }
  const name = textValue(body.name, 120);
  const email = textValue(body.email, 254).toLowerCase();
  const company = textValue(body.company, 160);
  const phone = textValue(body.phone, 40);
  const message = textValue(body.message, 4000);

  if (!name || !emailPattern.test(email) || !message) {
    return response.status(400).json({ error: "Name, email, and message are required" });
  }

  const env = globalThis.process?.env || {};
  const text = messageText({ name, email, company, phone, message });
  const mailFrom = env.MAIL_FROM || env.SMTP_USER;
  const mailTo = env.MAIL_TO || "vishruth@hakirush.com";

  if (env.RESEND_API_KEY) {
    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.MAIL_FROM || "Hakirush Website <onboarding@resend.dev>",
          to: [mailTo],
          reply_to: email,
          subject: `New website enquiry from ${name}`,
          text,
        }),
      });

      if (!resendResponse.ok) {
        console.error("Resend rejected contact email", await resendResponse.text());
        return response.status(502).json({ error: "Email provider rejected the message", code: "delivery_failed" });
      }

      return response.status(200).json({ ok: true });
    } catch (error) {
      console.error("Resend contact email failed", error);
      return response.status(502).json({ error: "Unable to connect to email provider", code: "delivery_failed" });
    }
  }

  const requiredSettings = [env.SMTP_HOST, env.SMTP_USER, env.SMTP_PASS, mailFrom];
  if (requiredSettings.some((setting) => !setting)) {
    return response.status(500).json({ error: "Email service is not configured", code: "configuration_missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: env.SMTP_SECURE === "true",
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text,
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return response.status(500).json({ error: "Unable to send message", code: "delivery_failed" });
  }
}