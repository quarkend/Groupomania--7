const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');

router.delete('/delete/:id', auth, commentCtrl.deleteComment);
router.post('/', auth, commentCtrl.createComment);

module.exports = router;
