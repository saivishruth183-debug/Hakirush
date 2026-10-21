# HAKIRUSH

## Run locally

The local frontend proxies `/api` requests to the Express mailer at
`http://localhost:5000`.

1. In `Backend`, copy `.env.example` to `.env` and set your SMTP credentials and
   recipient. For Gmail, use an app password.
2. Start the backend:

   ```powershell
   cd Backend
   npm install
   npm run dev
   ```

   Check that it is running at `http://localhost:5000/api/health`.
3. In another terminal, start the frontend:

   ```powershell
   cd Frontend
   npm install
   npm run dev
   ```

   Open the local URL printed by Vite. Leave `VITE_BACKEND_URL` empty to use
   the local proxy. If the backend is hosted separately, set
   `VITE_BACKEND_URL` in `Frontend/.env` to its base URL, without a trailing
   slash or `/api` suffix.

To check the form without sending email, set `DRY_RUN=true` in `Backend/.env`.

## Deploy to Vercel

1. Create a Vercel project with `Frontend` as its **Root Directory**. Vercel
   builds the Vite site and deploys `Frontend/api/contact.js` as the contact
   serverless function. The existing SPA fallback serves React routes such as
   `/contact` directly.
2. Add these environment variables in the Vercel project settings:
   - `RESEND_API_KEY`: an API key from Resend.
   - `MAIL_TO`: the inbox that should receive enquiries.
   - `MAIL_FROM`: a sender address on a domain verified with Resend, for
     example `HAKIRUSH Website <contact@your-verified-domain.com>`.
3. Redeploy after setting the variables. Do not set `VITE_BACKEND_URL` or
   `VITE_API_URL` for this setup; the form uses the same-origin `/api/contact`
   function. Never expose email service credentials in a `VITE_` variable.

The deployed endpoint returns a configuration error until all three server-side
variables are set. The sender domain must be verified in Resend for email
delivery to succeed.

## Deploy the Express backend separately

If you prefer to host the existing SMTP mailer as a separate Node.js service,
deploy `Backend` to a Node.js host rather than as a Vercel static deployment.
Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`,
`PORT` (if required by the host), and `ALLOWED_ORIGINS` in that service. Set
`ALLOWED_ORIGINS` to the exact frontend origin, without a path.

Then set `VITE_BACKEND_URL` in Vercel's build environment to the backend's
public base URL, without a trailing slash or `/api` suffix, and redeploy. The
frontend will send the form to `${VITE_BACKEND_URL}/api/contact`. The optional
legacy `VITE_API_URL` variable is used only when `VITE_BACKEND_URL` is unset.
