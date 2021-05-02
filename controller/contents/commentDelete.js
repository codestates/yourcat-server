const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { contentId } = req.params;
    const { commentId } = req.body;

    const content = await Content.findOne({ _id: contentId });
    if (!content) {
      return res.status(400).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    const { comment } = content;
    console.log(comment);
    const targetComment = comment.find(el => el._id.equals(commentId));

    if (!targetComment) {
      return res
        .status(400)
        .json({ message: '작성하신 댓글을 찾을 수 없습니다.' });
    }
    // _id값을 비교할때는 equals메소드를 사용한다.
    const isAuth = targetComment.userId.equals(userId);

    if (!isAuth) {
      return res
        .status(401)
        .json({ message: '댓글 작성자만 댓글을 삭제할 수 있습니다.' });
    }

    // { $pull: { 조건1, 조건2, ... } }
    // 특정값을 갖는 배열요소를 빼고싶다면
    // $pull: {필드값: {특정값}}
    await content.updateOne({
      $pull: { comment: { _id: commentId } },
    });
    res.status(200).json({ message: '댓글이 삭제되었습니다.' });
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 댓글을 삭제하지 못했습니다.', err });
  }
};

// userid는 토큰에서, contentId는 req.params에서 따온다. 그럼 commentId는??
// 1. 댓글을 만들때, db에 저장하고 댓글의 commentId를 클라에서받는다.
// 2. 댓글데이터는 어차피 배열로 전송되기때문에, 렌더할 때 map을 쓸텐데, key값으로 commnetId를 넣으면 어떨까
// 3. 댓글의 삭제버튼을 눌렀을 때, event.target.key 로 접근가능하나?
// 3.1 아 event.target하면 버튼이 잡히겠다. event.currentTarget으로하면 <li/>가 잡힐듯.아마?

// 4. 접근가능하면 그걸 서버에 주면 그걸로 DB 쿼리해서 삭제하면되는뎅 아니면 name에 넣을까

// content 구조

/* { 
  "_id" : ObjectId("6087fa8d51e7fa7f590b0cdc"),
 "like" : 0, 
 "title" : "고양이고양이고양이", 
 "category" : "q&a", 
 "description" : "안녕하세요 저는....", 
 "userId" : ObjectId("6087d2dd26113d588ebfa2e7"), 
 "comment" : [ 
   { "_id" : ObjectId("608a9c02352d4c33555df701"), "userId" : ObjectId("6087d2dd26113d588ebfa2e7"), "description" : "첫 댓글입니다." }, 
   { "_id" : ObjectId("608a9d9d62781534d0dc9fd1"), "userId" : ObjectId("6087d2dd26113d588ebfa2e7"), "description" : "세번째 댓글입니다." }, 
   { "_id" : ObjectId("608a9de062781534d0dc9fd2"), "userId" : ObjectId("6087d2dd26113d588ebfa2e7"), "description" : "두번째 댓글입니다." },
    { "_id" : ObjectId("608a9dec62781534d0dc9fd3"), "userId" : ObjectId("6087d2dd26113d588ebfa2e7"), "description" : "네번째 댓글입니다." }, ],
  "createdAt" : ISODate("2021-04-27T11:50:37.905Z"), 
  "updatedAt" : ISODate("2021-04-29T12:13:08.158Z"), 
  "__v" : 0 } */
