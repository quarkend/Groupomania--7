const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
router.post('/', likeCtrl.createLike);
router.get('/', likeCtrl.findAllLikes);
module.exports = router;