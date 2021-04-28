const express = require('express');

const router = express.Router();
const controller = require('../controller/users');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');

// * POST /users/signup
router.post('/signup', controller.signup);
// * POST /users/login
router.post('/login', controller.login);
router.get('/userinfo', tokenToUserInfo, controller.userInfo);
router.patch('/useredit', controller.userEdit);

module.exports = router;
