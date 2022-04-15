const db = require("../models");
const Comment = db.comments;
const Post = db.posts;
// logique métier : lire tous les commentaires
exports.findAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id } })
        .then(comments => {
            console.log(comments);
            res.status(200).json(comments);
        })
        .catch(error => res.status(400).json({ error }));
};
// logique métier : lire un commentaire par son id
exports.findOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            console.log(comment);
            res.status(200).json(comment)
        })
        .catch(error => res.status(404).json({ error }));
};
exports.createComment = (req, res, next) => {
    Post.findOne({ where: { id: req.body.postId } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post introuvable !' })
            }
            Comment.create({
                id: req.params.id,
                content: req.body.content,
                userId: req.body.userId,
                postId: post.id
            })
                .then(comment => res.status(201).json({ comment }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}
// Logique métier : supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.modifyComment = (req, res, next) => {
	console.log('dans la fonction modify');
    
		Comment.findByPk(req.params.id)
					Comment.update({
						content: req.body.content,
                        
					}, {where: {userId: req.params.id}})
						.then(() => res.status(200).json({ message: 'Objet modifié xxxxsssoooxx!'}))
			.catch(error => res.status(400).json({ error : "L'utilisateur n'est pas trouvé !" }));
	}
