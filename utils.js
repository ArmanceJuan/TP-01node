const fs = require("fs");
const path = require("path");

const addUser = (users, name, birth) => {
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
  if (!name || !birth) {
    const message = "Nom et date de naissance obligatoires";
    console.log(message);
    return message;
  }
  if (!regexName.test(name)) {
    const message = "Nom invalide";
    console.log(message);
    return message;
  }

  const newUser = {
    name,
    birth,
  };
  users.push(newUser);
  console.log("Utilisateur ajouté");
  return newUser;
};

const saveUsers = (filePath, users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users), "utf8");
    console.log("Utilisateurs sauvegardés");
  } catch (err) {
    console.log("Erreur dans la sauvegarde des utilisateurs");
  }
};

module.exports = { addUser, saveUsers };
