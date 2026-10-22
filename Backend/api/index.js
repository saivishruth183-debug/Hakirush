// Vercel serverless entry point.
// Every request is rewritten here (see vercel.json) and handled by the Express app.
const app = require('../app');

module.exports = app;