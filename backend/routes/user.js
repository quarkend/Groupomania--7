const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

router.delete('/delete', auth, userCtrl.deleteCurrentUser);

module.exports = router;
