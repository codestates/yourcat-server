const express = require('express');

const router = express.Router();
const controller = require('../controller/users');

// * POST /users/signup
router.post('/signup', controller.signup);
// * POST /users/login
router.post('/login', controller.login);
router.get('/userinfo', controller.userInfo);

module.exports = router;
