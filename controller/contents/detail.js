const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { contentId } = req.params;
    const contentInfo = await Content.findOne({ _id: contentId })
      .populate('userId')
      .lean();
    if (!contentInfo) {
      res.status(400).json({ message: '해당글의 정보를 찾을 수 없습니다.' });
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
