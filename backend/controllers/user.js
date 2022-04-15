const db = require('../models');
const mysql = require("mysql");
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
        .then(profile => {
            res.status(200).json(profile[0])
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
  	
exports.modifyUser = (req, res, next) => {
    // éléments de la requète
    const username = req.body.username;
    const email = req.body.email;



    // vérification que tous les champs sont remplis
    if (username === null || username === '' || email === null || email === '' ) {
        return res.status(400).json({ 'error': "Les champs 'nom' et 'prénom' doivent être remplis " });
    }
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
        {
            ...req.body.user,
            
            profilePicture: req.file.filename,
   
        } : { ...req.body };
        console.log(req.body),
    User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

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


// PUT Update User Password Controller
//==========================================================================================================
exports.updatePassword = (req, res, next) => {
    // éléments de la requète
   
    const { password } = req.body;
  const user= req.body

    // vérification que tous les champs sont remplis
    if (password === null || password === '' )
  
        // Si on ne trouve pas l'utilisateur
       
    bcrypt.hash(req.body.password, 10).then(valid => {
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
        }
        res.status(200).json({
            user,
            // Création d'un token pour sécuriser le compte de l'utilisateur
            token: jwt.sign(
                {
                    success: true,
                    message: 'Authentication successful!',
    
                    // user: {
                    //     username: "Admin",
                    //     email: "User",
                    // },
                },
                'secretToken',
                { expiresIn: '23h' }
            )
        });
    
    })
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
        {
            ...req.body.user,
            
          
   
        } : { ...req.body };
        console.log(req.body),
    User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'password modifié !' }))
        .catch(error => res.status(400).json({ error }));
};