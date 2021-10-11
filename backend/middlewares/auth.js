const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        // Verification que le token est bien présent
        if (!req.headers.authorization) {
            throw 'Token d\'auth manquant !';
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TKN);
        const userId = decodedToken.userId;
        const userRoles = decodedToken.roles;

        if (req.body.userId && parseInt(req.body.userId, 10) !== userId) {
            throw 'Id invalide';
        } else {
            res.locals.userId = userId;
            res.locals.userRoles = userRoles;
            next();
        }
    } catch (error) {
        return res.status(400).json({ error })
    }
};
