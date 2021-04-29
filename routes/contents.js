const express = require('express');

const router = express.Router();
const controller = require('../controller/contents');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');

// * POST /contents/create
router.post('/create', tokenToUserInfo, controller.create);
// * POST /contents/community/:category
router.post('/community/:category', controller.category);

module.exports = router;
