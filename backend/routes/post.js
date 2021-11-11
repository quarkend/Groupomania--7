
// const express = require('express');
// const router = express.Router();

// const postCtrl = require('../controllers/post');
// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

// router.get('/:id/comments', auth, postCtrl.getAllComments);
// router.delete('/delete/:id', auth, postCtrl.deletePost);
// router.get('/', auth, postCtrl.getAllPosts);
// router.post('/', auth, multer, postCtrl.createPost);

// module.exports = router;
// imports
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');
const auth = require('../middlewares/auth');

// Routes
router.get('/', postCtrl.findAllPosts);
router.get('/:id/comments', commentCtrl.findAllComments);
router.get('/:id/likes', likeCtrl.findAllLikes);
router.get('/:id', postCtrl.findOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;