const db = require('../models');
// imports
const models = require("../models");
const User = models.users;
const Post  = models.posts;
const Comment = models.comments;
const Like = models.likes;
exports.deleteCurrentUser = (req, res, next) => {
    db.User.destroy({ where: { id: res.userId } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(404).json({ error }))
}
/************************************** */


// const Post = models.posts;
// const Comment = models.comments;
// const Like = models.likes;

const fs = require('fs');

// logique métier : lire tous utilisateurs
exports.findAllUsersById = (req, res, next) => {
    console.log("kingparams: ", req.params);
    User.findAll()
        .then(users => {
            console.log("king: ", users);
            res.status(200).json( users );
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {

    User.findOne({ where: { userId: req.params.id } })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findAllUserByName = (req, res, next) => {

    User.findAll({ where: { username: req.params.name } })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({ error }));
};
exports.findOneUser = (req, res, next) => {

    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => res.status(404).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findAllUserByName = (req, res, next) => {

    User.findAll({ where: { username: req.params.name } })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({ error }));
};
//logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
    // éléments de la requète
    const username = req.body.username;


    // vérification que tous les champs sont remplis
    if (username === null || username === '') {
        return res.status(400).json({ 'error': "Les champs 'nom' et 'prénom' doivent être remplis " });
    }
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
        {
            ...req.body.user,
            profilePicture: req.file.filename,
            coverPicture: req.file.filename
        } : { ...req.body };

    User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// logique métier : supprimer un utilisateur
// if (req.body.userId === req.params.id || req.body.isAdmin)
exports.deleteUser = (req, res, next) => {
    Like.destroy({ where: { userId: req.params.id } })
        .then(() =>
            Comment.destroy({ where: { userId: req.params.id } })
                .then(() =>
                    Post.findAll({ where: { userId: req.params.id } })
                        .then(
                            (posts) => {
                                posts.forEach(
                                    (post) => {
                                        Comment.destroy({ where: { postId: post.id } })
                                        Like.destroy({ where: { postId: post.id } })
                                        post.destroy({ where: { id: post.id } })
                                    }
                                )
                            }
                        )
                        .then(() =>
                            User.findOne({ where: { id: req.params.id } })
                                .then(user => {
                                    const filename = user.imageUrl;
                                    fs.unlink(`images/${filename}`, () => {
                                        User.destroy({ where: { id: req.params.id } })
                                            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                                    })
                                })
                        )
                )
        )
        .catch(error => res.status(400).json({ error }));
};
// exports.getFriends = async (req, res) => {
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
// };
// exports.deleteUser = (req, res, next) => {
//     const accountId = req.params.id;
//     const accountDeleteParams = [accountId];
//     const accountDeleteSql = "DELETE FROM account WHERE account_id = ?;";
//     db.query({ 'sql': accountDeleteSql, 'timeout': 10000 }, accountDeleteParams, function (err, result) {
//         if (err) {
//             throw err;
//         }
//         if (result.affectedRows === 1) {
//             return res.status(200).json({ message: 'Le compte et toutes ses informations ont été supprimés avec succès !' });
//         } else {
//             return res.status(404).json({ message: 'Utilisateur non trouvé !' });
//         }
//     });
// };