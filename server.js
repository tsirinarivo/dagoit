// Point d'entrée pour cPanel Node.js App
// cPanel injecte la variable PORT automatiquement
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Erreur lors du traitement de la requête:", err);
      res.statusCode = 500;
      res.end("Erreur interne du serveur");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> DAGO IT prêt sur http://${hostname}:${port}`);
    console.log(`> Mode : ${dev ? "développement" : "production"}`);
  });
});
