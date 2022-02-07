//imports
const models = require("../models");
const Post = models.posts;
const User = models.users;
const Comment = models.comments;
const Like = models.likes;
const db = require('../models');
// logique métier : lire tous posts
//get user's all posts
// "http://localhost:3000/api/profile/:username", a
exports.getusersallposts = async (req, res) => {
    try {
        const user = await user.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.findAllPosts = (req, res, next) => {
    Post.findAll({
        order: [
            [req.query.sort ?? 'id', req.query.order ?? 'ASC']
        ],
        include: (req.query.include === 'user' ? [{ model: User, attributes: ['username'] }] : '')
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }));
};

exports.findPostsByUserId = (async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await db.posts.findAll({
        where: { UserId: id }

    });
    res.json(listOfPosts);
});
exports.findOnePost = (async (req, res) => {
    const id = req.params.id;
    const post = await db.posts.findByPk(id);
    res.json(post);
});

// FONCTIONNE logique métier : créer un post
exports.createPost = (req, res, next) => {
    // éléments de la requète
    const userId = req.body.id;
    const title = req.body.title;
    const desc = req.body.desc;


    // const img = req.body.img;
    // const img = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    // const img = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    // vérification que tous les champs sont remplis
    if (title === null || title === '' || desc === null || desc === '') {
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

// exports.modifyPostImg  = (req, res, next) => {
// 	console.log('dans la fonction modify');
// 	if (req.file) {
// 		Post.findByPk(req.params.id)
// 			.then(post => {
// 				const filename = post.image.split('/images/')[1];
// 				// suppression de l'anciene image
// 				fs.unlink(`images/${filename}`, () => {
// 				// update de utilisateur
// 					Post.update({
				
// 						desc: req.body.desc,
// 						title: req.body.title,
                        
// 					// image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
//                    img: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
// 					}, {where: {id: req.params.id}})
// 						.then(() => res.status(200).json({ message: 'Objet modifié xxxxsssoooxx!'}))
// 						.catch(error => res.status(400).json({ error }));
// 				})

// 			})
// 			.catch(error => res.status(400).json({ error : "L'utilisateur n'est pas trouvé !" }));
// 	}	else {
// 			Post.update({
			
//                 desc: req.body.desc,
//                 title: req.body.title,
// 			}, {where: {userId: req.params.id}})
// 				.then(() => res.status(200).json({ message: "L'utilisateur modifié !"}))
// 				.catch(error => res.status(400).json({ error }));	
// 		}
// };


// logique métier : modifier un post
// exports.modifyPostImg = (req, res, next) => {
//     // éléments de la requète

//     const desc = req.body.desc;
//     const img = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
//     // vérification que tous les champs sont remplis
//     if (title === null || title === '' || desc === null || desc === '') {
//         return res.status(400).json(window.alert("Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un post" ));
//     }

//     const postObject = req.body;

//     Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
//         .then(() => res.status(200).json({ message: 'Post modifié !' }))
//         .catch(error => res.status(400).json({ error }));
// };
// update a post


exports.modifyPostImg = (req, res, next) => {
    // éléments de la requète
  
// gestion d'ajout/modification image de profil
const userObject = req.file ?
  {
    ...req.body.user,
    img: req.file.filename
  } : { ... req.body};

Post.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
.then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
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
//         desc: req.body.desc,
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
