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
