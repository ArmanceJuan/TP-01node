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
  if (req.url === "/" && req.method === "GET") {
    try {
      console.log("Page chargée");
      const compileTemplate = pug.compileFile(
        path.join(__dirname, "./views/home.pug")
      );
      const html = compileTemplate();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (err) {
      console.log("Erreur dans le chargement de la page");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("500 Internal Server Error");
    }
  } else if (req.url === "/users" && req.method === "GET") {
    try {
      console.log("Récupération des utilisateurs");
      const compileTemplate = pug.compileFile(
        path.join(__dirname, "./views/users.pug")
      );
      const html = compileTemplate({ users });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (err) {
      console.log("Erreur dans la récupération des utilisateurs");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("500 Internal Server Error");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, LOCALHOST, () => {
  console.log(`Server running at http://${LOCALHOST}:${PORT}/`);
});
