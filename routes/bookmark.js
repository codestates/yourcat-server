const express = require('express');

const router = express.Router();
const controller = require('../controller/bookmarks');

/* 
  1. userId로 북마크 목록 불러오는 API
    1.1 포토페이지 / 다른커뮤니티페이지 북마크를 따로 렌더해야함.
     1.1.1 그럴려면? user의 bookmark필드를 두개로만들던지, bookmark필드 배열안에 category도 같이넣어야한다.
     아니!!!! 이거 몽고DB야!!

  2. 좋아요 누르면 북마크 추가기능
  3. 북마크 삭제기능 

*/
router.get('/list', controller.list);
router.patch('/add/:contentId', controller.add);

module.exports = router;
