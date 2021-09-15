const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({ error: "User not logged in!" });

    try {
        const validToken = verify(accessToken, "importantsecret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({ error: err });
    }
};

module.exports = { validateToken };


// // middleware d'authentification, compare le userId présent dans
// //le token de la requête avec userId de la requête
// const jwt = require('jsonwebtoken');
// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'bHGdUJQydUO');
//         const userId = decodedToken.userId;
//         if (req.body.userId && req.body.userId !== userId) {
//             return res.status(401).json({ error: "Lidentifiant de l'utilisateur n'est pas valable !" });
//         } else {
//             next();
//         }
//     } catch {
//         res.status(401).json({ error: new Error('Invalid request!') });
//     }
// };