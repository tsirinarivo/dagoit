// Point d'entrée cPanel — délègue au serveur standalone Next.js
process.chdir(__dirname);

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOST || "localhost";

process.env.PORT = String(port);
process.env.HOSTNAME = hostname;
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("./.next/standalone/server.js");
