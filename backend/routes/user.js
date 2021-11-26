const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');
// const auth = require('../middlewares/auth');
// const { validateToken } = require("../middlewares/auth")
/******************* */
const auth = require('../middlewares/auth');

router.delete('/delete', userCtrl.deleteCurrentUser);
router.get('/', auth, userCtrl.findAllUsers);
/************************** */
router.delete('/delete', userCtrl.deleteCurrentUser);
// router.get('/', validateToken, userCtrl.findAllUsers);
router.get('/friends/:userId', userCtrl.getFriends);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id', userCtrl.findAllUserByName);
router.get('/:id/posts', postCtrl.findAllPosts);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
module.exports = router;
//get a user
// router.get("/", async (req, res) => {
//     const userId = req.query.userId;
//     const username = req.query.username;
//     try {
//         const user = userId
//             ? await User.findById(userId)
//             : await User.findOne({ username: username });
//         const { password, updatedAt, ...other } = user._doc;
//         res.status(200).json(other);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //get friends
// router.get("/friends/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         const friends = await Promise.all(
//             user.followings.map((friendId) => {
//                 return User.findById(friendId);
//             })
//         );
//         let friendList = [];
//         friends.map((friend) => {
//             const { _id, username, profilePicture } = friend;
//             friendList.push({ _id, username, profilePicture });
//         });
//         res.status(200).json(friendList)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //follow a user

// router.put("/:id/follow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if (!user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $push: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $push: { followings: req.params.id } });
//                 res.status(200).json("user has been followed");
//             } else {
//                 res.status(403).json("you allready follow this user");
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("you cant follow yourself");
//     }
// });

// //unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if (user.followers.includes(req.body.userId)) {
//                 await user.updateOne({ $pull: { followers: req.body.userId } });
//                 await currentUser.updateOne({ $pull: { followings: req.params.id } });
//                 res.status(200).json("user has been unfollowed");
//             } else {
//                 res.status(403).json("you dont follow this user");
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("you cant unfollow yourself");
//     }
// });