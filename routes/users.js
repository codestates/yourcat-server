const express = require('express');

const router = express.Router();
const controller = require('../controller/users');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');
const removeS3Image = require('../middlewares/removeS3Image');

// * POST /users/signup
router.post('/signup', controller.signup);
// * POST /users/login
router.post('/login', controller.login);
// * GET /users/userinfo
router.get('/userinfo', tokenToUserInfo, controller.userInfo);
// * PATCH /users/useredit
router.patch('/useredit', tokenToUserInfo, controller.userEdit);
// * DELETE /users/withdrawal
router.delete(
  '/withdrawal',
  tokenToUserInfo,
  controller.withdrawal,
  removeS3Image,
);

module.exports = router;
