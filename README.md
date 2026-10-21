# Hakirush

## Run locally

1. In `Backend`, create `.env` from `.env.example` and set the SMTP credentials and recipient address. For Gmail, use an app password.
2. Start the mail API:

   ```powershell
   cd Backend
   npm install
   npm start
   ```

   The API listens on `http://localhost:5000`. Check it at `http://localhost:5000/api/health`.
3. In a second terminal, start the frontend:

   ```powershell
   cd Frontend
   npm install
   npm run dev
   ```

   Set `VITE_BACKEND_URL=http://localhost:5000` in `Frontend/.env` for local development. If this variable is left empty, Vite proxies `/api` requests to `http://localhost:5000`.

## Deploy separately

- Deploy `Backend` as a Node.js web service and configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `PORT` (if required by the host), and `ALLOWED_ORIGINS` in the service's environment settings. Set `ALLOWED_ORIGINS` to the exact frontend origin, such as `https://your-site.vercel.app` (no path). Do not put SMTP credentials in the frontend.
- Deploy `Frontend` to Vercel and set the build environment variable `VITE_BACKEND_URL` to the backend's public base URL, with no trailing slash or `/api` suffix (for example, `https://your-backend.example.com`). Redeploy after changing it. The older `VITE_API_URL` name is still supported as a fallback.
- The frontend sends requests to `${VITE_BACKEND_URL}/api/contact`. The backend health check is `${VITE_BACKEND_URL}/api/health`.

The Vercel configuration serves frontend routes only; it does not host or proxy the Express backend. Both services must be deployed and reachable over HTTPS for the production contact form to send mail.
