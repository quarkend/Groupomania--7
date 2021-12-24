const express = require('express');
const router = express.Router();

const multer = require("./../app")
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');

router.delete('/delete', userCtrl.deleteCurrentUser);
router.get('/byId/:id', auth, userCtrl.findAllUsersById);
/************************** */
router.delete('/delete', userCtrl.deleteCurrentUser);

// router.get('/friends/:userId', userCtrl.getFriends);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id', userCtrl.findAllUserByName);
router.get('/:id/posts', postCtrl.findAllPosts);
// router.put('/:id', userCtrl.modifyUser);
// router.delete('/:id', userCtrl.deleteUser);
module.exports = router;
