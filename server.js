const http = require("http");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const dayjs = require("dayjs");
require("dayjs/locale/fr");
dayjs.locale("fr");

const { addUser, saveUsers } = require("./utils");
require("dotenv").config();

const PORT = process.env.APP_PORT || 3000;
const LOCALHOST = process.env.APP_LOCALHOST || "localhost";

const server = http.createServer((req, res) => {
  if (req.url === "/css/style.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    try {
      const css = fs.readFileSync("./assets/css/style.css");
      res.write(css);
      res.end();
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Erreur lors de la lecture du fichier CSS" })
      );
    }
    return;
  }
  const usersFile = path.join(__dirname, "./Data/users.json");
  let users = [];

  try {
    const data = fs.readFileSync(usersFile, "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.log("Erreur dans la récupération des utilisateurs");
  }

  if (req.url === "/" && req.method === "GET") {
    // Affiche la page d'accueil
    try {
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
  } else if (req.url === "/" && req.method === "POST") {
    // Ajout d'un utilisateur
    try {
      console.log("Ajout d'un utilisateur");
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const params = new URLSearchParams(body);
        const name = params.get("name");
        const birth = params.get("birth");
        const newUser = addUser(users, name, birth);

        saveUsers(usersFile, users);
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    } catch (err) {
      console.log("Erreur dans la récupération des utilisateurs");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("500 Internal Server Error");
    }
  } else if (req.url === "/users" && req.method === "GET") {
    // Affiche la liste des utilisateurs
    try {
      const data = fs.readFileSync(usersFile, "utf8");
      users = JSON.parse(data);
      const formattedDate = users.map((user) => {
        return {
          name: user.name,
          birth: dayjs(user.birth).format("dddd DD MMMM YYYY"),
        };
      });

      const compileTemplate = pug.compileFile(
        path.join(__dirname, "./views/users.pug")
      );

      const html = compileTemplate({ users: formattedDate });
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
