const http = require("http");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST || "localhost";

let users = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];

const server = http.createServer((req, res) => {
  try {
    console.log(`Requête reçue pour ${req.url}`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World");
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Erreur lors de la compilation du fichier", err.message);
  }
});

server.listen(PORT, LOCALHOST, () => {
  console.log(`Server running at http://${LOCALHOST}:${PORT}/`);
});
