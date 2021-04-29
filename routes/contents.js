const express = require('express');

const router = express.Router();
const controller = require('../controller/contents');
const tokenToUserInfo = require('../middlewares/tokenToUserInfo');

// * POST /contents/create
router.post('/create', tokenToUserInfo, controller.create);
// * POST /contents/:category
router.post('/:category', controller.category);
// * GET contents/detail/:contentId
router.get('/detail/:contentId', controller.detail);
// * DELETE contents/delete/:contentId
router.delete('/delete/:contentId', tokenToUserInfo, controller.contentDelete);
// * PATCH contents/edit/:contentId
router.patch('/edit/:contentId', tokenToUserInfo, controller.contentEdit);
// * PATCH contents/addcomment/:contentId
router.patch('/addcomment/:contentId', tokenToUserInfo, controller.commentAdd);
// * DELETE contents/deletecomment/:contentId
router.delete(
  '/deletecomment/:contentId',
  tokenToUserInfo,
  controller.commentDelete,
);
// 좋아요 클릭 -> 글의 하트와 유저의 북마크에 모두업데이트 되어야한다.

module.exports = router;
