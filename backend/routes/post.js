
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')

router.get('/profile/:username', postCtrl.getusersallposts);
router.get('/', postCtrl.findAllPosts);

// router.get('/byuserId/:id', postCtrl.findPostsByUserId);
router.get('/:id/comments', commentCtrl.findAllComments);
router.get('/:id/likes', likeCtrl.findAllLikes);

// router.post('/', likeCtrl.createLike);
router.get('/byId/:id', postCtrl.findOnePost);
router.post('/', postCtrl.createPost);
router.put('/upimg/:id',multer, postCtrl.modifyPostImg);
// router.put('/uppost/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;