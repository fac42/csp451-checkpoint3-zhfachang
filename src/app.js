const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Hello from CSP-451" });
});

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "healthy", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

module.exports = app;

/* istanbul ignore next -- bootstrap; only runs when invoked as `node src/app.js` */
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}
