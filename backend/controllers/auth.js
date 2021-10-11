const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {
    // Regexp pour email (au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(req.body.password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir minimum 8 caractères et au minimum une minuscule, une majuscule, un chiffre et un caractère spécial (!@#$%^&*)' })
    }

    // Hashage du mot de pass
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création et sauvegarde de l'user
            db.User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
            })
                .then(user => {
                    res.status(201).json({
                        token: jwt.sign(
                            {
                                userId: user.id,
                                roles: user.roles,
                            },
                            process.env.TKN,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // recherche si l'utilisateur existe déja
            if (!user) {
                return res.status(401).json({ error: 'Informations d\'identification invalides' })
            }

            // comparaison de ce qui est tapé et ce qui est dans la BdD
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (!isValid) {
                        return res.status(401).json({ error: 'Informations d\'identification invalides' })
                    }

                    res.status(200).json({
                        token: jwt.sign(
                            {
                                userId: user.id,
                                roles: user.roles,
                            },
                            process.env.TKN,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
};

exports.getCurrentUser = (req, res, next) => {
    db.User.findOne({ where: { id: res.locals.userId } })
        .then(user => {
            return res.status(200).json({
                username: user.username,
                roles: user.roles
            });
        })
        .catch(error => res.status(500).json({ error }))
}
