const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    // 1. GET요청 URL의 :contentId와 일치하는 글을 찾는다.
    const { contentId } = req.params;
    const contentInfo = await Content.findOne({ _id: contentId })
      .populate('userId')
      .lean();
    // 2. 없으면 400상태코드를 보낸다.
    if (!contentInfo) {
      res.status(400).json({ message: '해당글의 정보를 찾을 수 없습니다.' });

      // 3. 있으면 정보를 보내준다.
    } else {
      res.status(200).json({
        contentInfo,
        message: '해당 글의 상세페이지 정보를 불러오는데 성공했습니다.',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: '서버문제로 글의 상세페이지 정보를 불러오는데 실패했습니다.',
      err,
    });
  }
};
