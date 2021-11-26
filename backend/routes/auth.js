const express = require('express');
const router = express.Router();


const authCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');



router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/user', authCtrl.getCurrentUser);
router.get('/auth', authCtrl.getCurrentUser);
// router.get('/', authCtrl.getCurrentUser);
// router.get('/users', authCtrl.findAllUsers);
// router.get("/auth", (req, res) => {
//     res.json(req.user);
// });
module.exports = router;

