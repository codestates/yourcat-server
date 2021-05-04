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
