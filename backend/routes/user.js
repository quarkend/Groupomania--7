const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config')
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
router.delete('/delete', userCtrl.deleteCurrentUser);
router.get('/', userCtrl.findAllUsersById);


/************************** */
router.delete('/delete', userCtrl.deleteCurrentUser);
// router.get('/friends/:userId', userCtrl.getFriends);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id', userCtrl.findAllUserByName);
router.get('/:id/posts', postCtrl.findAllPosts);
router.put('/:id', multer,userCtrl.modifyUser);
 router.put('/update', userCtrl.updatePassword);
// router.put('updateUserProfile/:id', userCtrl.modifyUserPic);
 router.delete('/:id', userCtrl.deleteUser);
//  router.post('/upload',userCtrl.upload);
module.exports = router;
