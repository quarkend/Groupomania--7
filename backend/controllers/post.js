const fs = require('fs');

const db = require('../models');

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [
            [req.query.sort ?? 'id', req.query.order ?? 'ASC']
        ],
        include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['username'] }] : '')
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }))
}

exports.createPost = (req, res, next) => {
    db.Post.create({
        title: req.body.title,
        content: req.body.content,
        ownerId: res.locals.userId,
        image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    })
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (res.locals.userRoles.includes('ADMIN')) {
                if (post.image) {
                    const filename = post.image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) throw err;
                    })
                }
                db.Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(404).json({ error }))
            } else {
                return res.status(403).json({ error: 'Vous ne disposez pas de droits ' })
            }
        })
        .catch(error => res.status(404).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        where: { postId: req.params.id },
        order: [
            [req.query.sort ?? 'id', req.query.order ?? 'ASC']
        ],
        include: (req.query.include === 'user' ? [{ model: db.User, attributes: ['username'] }] : '')
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}
