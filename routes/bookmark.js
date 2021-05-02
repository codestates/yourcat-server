const express = require('express');

const router = express.Router();
const controller = require('../controller/bookmarks');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');

// * GET /bookmarks/list
router.get('/list', tokenToUserInfo, controller.list);
// * PATCH /bookmarks/edit/:contentId
router.patch('/edit/:contentId', tokenToUserInfo, controller.edit);

module.exports = router;
