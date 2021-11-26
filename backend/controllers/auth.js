// imports
const db = require("../models");
const User = db.users;
const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { validateToken } = require("../middlewares/auth");
// const { sign } = require("jsonwebtoken");
// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (Post signup)
exports.signup = (req, res, next) => {
    // éléments de la requète
    const username = req.body.username;

    const email = req.body.email;
    const password = req.body.password;

    // vérification que tous les champs sont remplis
    if (username === null || username === ''
        || email === null || email === '' || password === null || password === '') {
        return res.status(400).json({ 'error': "Veuillez remplir l'ensemble des champs du formulaire" });
    }

    // // Masquage de l'adresse mail
    // let buff = new Buffer(email);
    // let emailInbase64 = buff.toString('base64');
    // vérification si l'user existe dans DB
    User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
        .then((userFound) => {
            // si l'utilisateur n'existe pas la DB
            if (!userFound) {
                // Hash du mot de passe avec bcrypt
                bcrypt.hash(password, 10)
                    .then(hash => {
                        // Masquage de l'adresse mail
                        // let buff = new Buffer(email);
                        // let emailInbase64 = buff.toString('base64');

                        // Création du nouvel utilisateur
                        const user = new User({
                            username: username,

                            email: email,
                            password: hash
                        })
                        // Sauvegarde dans la base de données
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                            .catch(error => res.status(400).json({ error }));
                    })
            } else if (userFound) {
                return res.status(409).json({ error: "L'utilisateur existe déjà !" })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {
    // // Masquage de l'adresse mail
    // let buff = new Buffer(req.body.email);
    // let emailInbase64 = buff.toString('base64');

    // Recherche d'un utilisateur dans la base de données
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // Si on ne trouve pas l'utilisateur
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            // On compare le mot de passe de la requete avec celui de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        username: user.username,
                        email: user.email,
                        userId: user.id,
                        // // // userId: user.userId,
                        userAdmin: user.isAdmin,
                        // Création d'un token pour sécuriser le compte de l'utilisateur
                        token: jwt.sign(
                            {
                                username: user.username,
                                email: user.email,
                                userId: user.id,
                                // // userId: user.userId,
                                isAdmin: user.isAdmin
                            },
                            'secretToken',
                            { expiresIn: '23h' }
                        )
                    });

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.getCurrentUser = async (req, res, next) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await db.User.findById({ userId: { userId: user.userId } })
            : await db.User.findOne({ where: { username: user.username } })
                // db.User.findOne({ where: { username: user.username } })
                .then(user => {
                    return res.status(200).json({
                        userId: user.userId,
                        username: user.username,
                        isAdmin: user.isAdmin
                    });
                })
    } catch (err) {
        res.status(500).json(err);
    }
}
/****************************************************/
// /***** */
// exports.findAllUsers = async (req, res) => {
//     const id = req.params.id;
//     const setlistOfUsers = await Users.findAll({
//         where: { id: id },

//     });
//     res.json(setlistOfUsers);
// };

exports.findAllUsers = async (req, res, next) => {
    console.log(req.params);

    Users.findAll(
        {
            attributes: {
                attr1: 'id',
                attr2: 'username',

            }
        },
        { order: [['username', 'ASC']] })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }))
};




//get friends

/*********** */


//get a user
// exports.getCurrentUser(async (req, res, next) => {
//     // const userId = req.query.userId;
//     const userId = req.query.userId;

//     const username = req.query.username;
//     try {
//         const user = userId
//             ? await db.User.findById(userId)
//             : await db.User.findOne({ username: username });
//         const { password, updatedAt, ...other } = user._doc;
//         res.status(200).json(other);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//get friends
// router.get("/friends/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         const friends = await Promise.all(
//             user.followings.map((friendId) => {
//                 return User.findById(friendId);
//             })
//         );
//         let friendList = [];
//         friends.map((friend) => {
//             const { _id, username, profilePicture } = friend;
//             friendList.push({ _id, username, profilePicture });
//         });
//         res.status(200).json(friendList)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//follow a user

// router.put("/:id/follow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if (!user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $push: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $push: { followings: req.params.id } });
//                 res.status(200).json("user has been followed");
//             } else {
//                 res.status(403).json("you allready follow this user");
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("you cant follow yourself");
//     }
// });

// //unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if (user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $pull: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $pull: { followings: req.params.id } });
//                 res.status(200).json("user has been unfollowed");
//             } else {
//                 res.status(403).json("you dont follow this user");
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("you cant unfollow yourself");
//     }
// });

// module.exports = router;
