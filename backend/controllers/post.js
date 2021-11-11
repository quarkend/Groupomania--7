//imports
const models = require("../models");
const Post = models.posts;
const Comment = models.comments;
const Like = models.likes;
const db = require('../models');
// logique métier : lire tous posts

exports.findAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(posts => {
            console.log(posts);
            res.status(200).json({ data: posts });
        })
        .catch(error => res.status(400).json({ error }));
};

// Find all posts where userId
exports.findPostsByUserId = (req, res, next) => {
    Post.findAll({
        where: { userId: req.params.id },
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(posts => {
            console.log(posts);
            res.status(200).json({ data: posts });
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un post par son id
exports.findOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            console.log(post);
            res.status(200).json(post)
        })
        .catch(error => res.status(404).json({ error }));
};

// exports.createPost = (req, res, next) => {
//     db.Post.create({
//         title: req.body.title,
//         content: req.body.content,
//         // userId: res.userId,
//         image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
//     })
//         .then(post => res.status(201).json({ post }))
//         .catch(error => res.status(400).json({ error }))
// }
// FONCTIONNE logique métier : créer un post
exports.createPost = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content = req.body.content;
    const image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);

    // vérification que tous les champs sont remplis
    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un post" });
    }

    const postObject = req.body;

    // Création d'un nouvel objet post
    const post = new Post({
        ...postObject,
    });
    // Enregistrement de l'objet post dans la base de données
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un post
exports.modifyPost = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis
    if (title === null || title === '' || content === null || content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un post" });
    }

    const postObject = req.body;

    Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// Logique métier : supprimer un post
exports.deletePost = (req, res, next) => {
    Like.destroy({ where: { postId: req.params.id } })
        .then(() =>
            Comment.destroy({ where: { postId: req.params.id } })
                .then(() =>
                    Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                )
        )
        .catch(error => res.status(400).json({ error }));
};
// const fs = require('fs');
// const models = require("../models");
// const db = require('../models');
// const Post = models.posts;
// exports.getAllPosts = (req, res, next) => {
//     db.Post.findAll({
//         order: [
//             [req.query.sort ?? 'id', req.query.order ?? 'ASC']
//         ],
//         include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['username'] }] : '')
//     })
//         .then(posts => res.status(200).json(posts))
//         .catch(error => res.status(500).json({ error }))
// }

// exports.createPost = (req, res, next) => {
//     db.Post.create({
//         title: req.body.title,
//         content: req.body.content,
//         userId: res.userId,
//         image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
//     })
//         .then(post => res.status(201).json({ post }))
//         .catch(error => res.status(400).json({ error }))
// }

// exports.deletePost = (req, res, next) => {
//     db.Post.findOne({ where: { id: req.params.id } })
//         .then(post => {
//             if (res.userRoles.includes('ADMIN')) {
//                 if (post.image) {
//                     const filename = post.image.split('/images/')[1];
//                     fs.unlink(`images/${filename}`, (err) => {
//                         if (err) throw err;
//                     })
//                 }
//                 db.Post.destroy({ where: { id: req.params.id } })
//                     .then(() => res.status(200).json({ message: 'Post supprimé !' }))
//                     .catch(error => res.status(404).json({ error }))
//             } else {
//                 return res.status(403).json({ error: 'Vous ne disposez pas de droits ' })
//             }
//         })
//         .catch(error => res.status(404).json({ error }))
// }

// exports.getAllComments = (req, res, next) => {
//     db.Comment.findAll({
//         where: { postId: req.params.id },
//         order: [
//             [req.query.sort ?? 'id', req.query.order ?? 'ASC']
//         ],
//         include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['username'] }] : '')
//     })
//         .then(comments => res.status(200).json(comments))
//         .catch(error => res.status(500).json({ error }))
// }
