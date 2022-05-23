// imports
const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  // éléments de la requète
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // vérification que tous les champs sont remplis
  if (
    username === null ||
    username === "" ||
    email === null ||
    email === "" ||
    password === null ||
    password === ""
  ) {
    return res
      .status(400)
      .json({ error: "Veuillez remplir l'ensemble des champs du formulaire" });
  }
  User.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then((userFound) => {
      // si l'utilisateur n'existe pas la DB
      if (!userFound) {
        // Hash du mot de passe avec bcrypt
        bcrypt.hash(password, 10).then((hash) => {
          // Création du nouvel utilisateur
          const user = new User({
            username: username,
            email: email,
            password: hash,
          });
          // Sauvegarde dans la base de données
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else if (userFound) {
        return res.status(409).json({ error: "L'utilisateur existe déjà !" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {
  // Recherche d'un utilisateur dans la base de données
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // Si on ne trouve pas l'utilisateur
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // On compare le mot de passe de la requete avec celui de la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            user,
            // Création d'un token pour sécuriser le compte de l'utilisateur
            token: jwt.sign(
              {
                success: true,
                message: "Authentication successful!",
                // user: {
                //     username: "Admin",
                //     email: "User",
                // },
              },
              "secretToken",
              { expiresIn: "23h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getCurrentUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById({ userId: { userId: user.userId } })
      : await User.findOne({ where: { username: user.username } })
          // db.User.findOne({ where: { username: user.username } })
          .then((user) => {
            return res.status(200).json({
              userId: user.userId,
              username: user.username,
              isAdmin: user.isAdmin,
            });
          });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.findAllUsers = async (req, res, next) => {
  console.log(req.params);
  User.findAll(
    {
      attributes: {
        attr1: "id",
        attr2: "username",
      },
    },
    { order: [["username", "ASC"]] }
  )
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
};
