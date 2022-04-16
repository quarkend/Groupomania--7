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
            [req.query.sort ?? 'id', req.query.order ?? 'DESC']
        ],
        include: (req.query.include === 'user' ? [{ model: User, attributes: ['username'] }] : '')
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }));
};

exports.findOnePost = (async (req, res) => {
    const id = req.params.id;
    const post = await db.posts.findByPk(id);
    res.json(post);
});
// FONCTIONNE logique métier : créer un post
exports.createPost = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const desc = req.body.desc;
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
