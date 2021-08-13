const express = require('express');

const router = express.Router();
const controller = require('../controller/contents');
const removeS3Image = require('../middlewares/removeS3Image');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');

// * POST /contents/create
router.post('/create', tokenToUserInfo, controller.create);
// * POST /contents/:category
router.post('/:category', controller.category);
// * GET contents/detail/:contentId
router.get('/detail/:contentId', controller.detail);
// * DELETE contents/delete/:contentId
router.delete(
  '/delete/:contentId',
  tokenToUserInfo,
  controller.contentDelete,
  removeS3Image,
);
// * PATCH contents/edit/:contentId
router.patch('/edit/:contentId', tokenToUserInfo, controller.contentEdit);
// * PATCH contents/addcomment/:contentId
router.patch('/addcomment/:contentId', tokenToUserInfo, controller.commentAdd);
// * PATCH contents/editcomment/:contentId
router.patch(
  '/editcomment/:contentId',
  tokenToUserInfo,
  controller.commentEdit,
);
// * PATCH contents/deletecomment/:contentId
router.patch(
  '/deletecomment/:contentId',
  tokenToUserInfo,
  controller.commentDelete,
);

module.exports = router;
