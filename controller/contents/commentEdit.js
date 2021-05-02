const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { _id: userId } = req.user;
    const { commentId, description } = req.body;

    // 1. 요청들어온 글의 댓글리스트 쿼리
    const contentInfo = await Content.findById(contentId)
      .select('-_id comment')
      .lean();
    const { comment } = contentInfo;

    // 2. 댓글리스트 중, body의 commentId와 일치하는 댓글 찾아서 commentTarget에 할당.
    const commentTarget = comment.find(el => el._id.equals(commentId));

    // 3.1 현재 로그인한 유저와 댓글 작성자가 다르면 요청을 거부한다.
    if (!userId.equals(commentTarget.userId)) {
      res
        .status(401)
        .json({ message: '댓글의 작성자만 댓글을 수정할 수 있습니다.' });
    } else {
      // 3.2 댓글작성자가 맞으면 댓글을 수정해준다.

      // 4. 모든 글의 comment field 중 위의 댓글과 일치하는 댓글을 찾아서 새로운 값으로 덮어씌워준다.
      await Content.updateOne(
        { comment: commentTarget },
        {
          'comment.$': {
            userId: commentTarget.userId,
            description,
          },
        },
      ).lean();

      res.status(200).json({ message: '댓글이 수정되었습니다.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 댓글을 수정하지 못했습니다.', err });
  }
};
