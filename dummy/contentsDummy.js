module.exports = {
  // TODO: 유저가 쓴글 요청할 때
  req_user: {
    // userInfo._id와 db.contents.userId가 일치하는 글들 뽑아준다.
    accessToken: '토큰32',
  },
  res_user: [
    // contentId에 db.contents._id를 담아보낸다.
    {
      contentId: 'content32',
      title: '내가쓴글',
    },
    { contentId: 'content51', title: '우리 동네 길냥이에요' },
  ],

  // TODO: 카테고리별 글 요청할 때
  // contents/:category로 get요청한다. 서버는 req.params.category 와 db.contents.category가 일치하는 정보 뽑아준다.
  req_category: 'none',
  res_category: [
    // category와 일치하는 글들 찾고, 글의 userId로 db.users._id에 접근해서 nickname 빼와야함.? (TODO: 미들웨어로 만들어야겠다)
    {
      contentId: 'content13',
      title: '카테고리별 글들',
      nickname: '유원님짱',
    },
    { contentId: 'content25', title: '배고프다', nickname: '주현님짱짱' },
  ],

  // TODO: 상세 페이지 요청할 때
  // contents/:contentId로 get요청한다. 서버는 req.params.detail 과 db.contents._id가 일치하는 정보를 준다.
  req_detail: 'none',
  res_detail: {
    title: '클릭했을 때, 상세페이지제목입니다.',
    description: '상세페이지 내용입니다.',
    like: 3,
    image: 'abcd123.jpg',
    comment: [
      { nickname: '칭찬러', description: '너무에뻐요~~' },
      { nickname: '불편러', description: '안돼나요가 아니라 안되나요입니다.' },
    ],
  },
};
