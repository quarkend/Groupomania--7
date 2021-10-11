const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/:id/comments', auth, postCtrl.getAllComments);
router.delete('/delete/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);

module.exports = router;
