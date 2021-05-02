const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { _id: userId } = req.user;
    const { description } = req.body;

    // contentId로 해당글을 찾고, comment 배열에 {userId,description}을 넣는다.
    await Content.findById(contentId).updateOne({
      $push: { comment: { userId, description } },
    });

    // content의 userId 말고, 배열안의 userId만 populate하고싶으면, 중첩populate를 사용하면 된다.
    // 상위 path에는 배열이들어가는 key를, 하위 path에 userId를 넣으면된다.
    // select 옵션으로 원하는 값만 쿼리할 수 있다.
    const content = await Content.findById(contentId).populate({
      path: 'comment',
      populate: { path: 'userId', select: '_id nickname bookmark' },
    });
    const comment = content.comment.slice(-1);
    const {
      _id: commentId,
      userId: { nickname },
      description: uploadedDescription,
    } = comment[0];

    res.status(200).json({
      message: '댓글이 작성되었습니다.',
      commentId,
      nickname,
      description: uploadedDescription,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 댓글 작성에 실패했습니다.', err });
  }
};
