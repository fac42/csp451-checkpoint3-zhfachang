const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Hello from CSP-451" });
});

module.exports = app;

/* istanbul ignore next -- bootstrap; only runs when invoked as `node src/app.js` */
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}
