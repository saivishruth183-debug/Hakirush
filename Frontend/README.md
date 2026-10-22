# HAKIRUSH frontend

## Local development

Run the Express mailer from `Backend` and Vite from this directory in separate
terminals. Vite proxies `/api` to `http://localhost:5000` by default:

```powershell
npm install
npm run dev
```

Leave `VITE_API_URL` unset to use the local proxy during development and the
same-origin Vercel API in production. Set `VITE_API_URL` only when connecting
to a separately hosted backend.

## Vercel

Set this directory (`Frontend`) as the Vercel project's **Root Directory**.
Use `npm run build` as the build command and `dist` as the output directory.
The site uses
`api/contact.js` as its same-origin serverless contact endpoint. Configure
`RESEND_API_KEY`, `MAIL_TO`, and `MAIL_FROM` as server-side Vercel environment
variables, then redeploy. `MAIL_FROM` must use a sender domain verified with
Resend. Do not add these secrets to `VITE_` variables.

For the same-origin endpoint, the Vercel **Root Directory** must be `Frontend`
(not `/api/contact`), and `VITE_API_URL` should be unset so the form posts to
`/api/contact` on the site. Make sure all three Resend variables are enabled for
the deployment's environment (Production or Preview) and redeploy after changing
them. A 404 usually means the function route was not deployed or the form is
pointing at the wrong API URL; a 503 response from the function means its Resend
environment variables are missing.

See the repository [README](../README.md) for local backend setup and the
alternative of deploying the Express mailer separately.
