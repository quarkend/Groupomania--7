
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');
const auth = require('../middlewares/auth');

// Routes
// router.get("http://localhost:8800/api/profile/:username", async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.params.username });
//         const posts = await Post.find({ userId: user._id });
//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
// "http://localhost:3000/api/profile/:username", a
// exports.getusersallposts = async (req, res) => {

router.get('/profile/:username', postCtrl.getusersallposts);
router.get('/', postCtrl.findAllPosts);

router.get('/byuserId/:id', postCtrl.findPostsByUserId);
router.get('/:id/comments', commentCtrl.findAllComments);
// router.get('/:id/likes', likeCtrl.findAllLikes);

// router.post('/', likeCtrl.createLike);
router.get('/byId/:id', postCtrl.findOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;