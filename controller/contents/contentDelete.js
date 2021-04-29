const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    // 1. 토큰으로 req.user에서 _id를 받아온다.
    const { _id: userIdFromToken } = req.user;
    const { contentId } = req.params;
    const contentInfo = await Content.findById(contentId);
    const userIdFromContent = contentInfo.userId;

    // 2. 이 _id와 contentId의 글의 userId가 일치하는지 확인하고 삭제한다.
    if (String(userIdFromToken) === String(userIdFromContent)) {
      await Content.deleteOne({ _id: contentId });
      res.json({ message: '게시글이 삭제되었습니다.' });

      // 2.1 일치하지않으면 삭제 권한이 없다는 메시지를 보낸다.
    } else {
      res.json({ message: '글의 작성자만 게시글을 삭제할 수 있습니다.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 글이 삭제되지 않았습니다.', err });
  }
};
