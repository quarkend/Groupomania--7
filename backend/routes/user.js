const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');

router.delete('/delete', auth, userCtrl.deleteCurrentUser);
router.get('/', userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id/posts', postCtrl.findAllPosts);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
module.exports = router;
