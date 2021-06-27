// imports
const express = require('express');
router = express.Router();
usersRoute = require('../controllers/usersControllers');

// address proxy
router.get("/", usersRoute.usersControllers)

module.exports = router;