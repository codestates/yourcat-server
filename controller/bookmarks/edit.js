const User = require('../../models/User');
const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { _id: userId } = req.user;
    const { isBookmark } = req.body;

    // 클라이언트에서 isBookmark를 false로 줬다면, 북마크에 추가해준다.
    if (!isBookmark) {
      await User.findById(userId)
        .updateOne({ $push: { bookmark: { contentId } } })
        .lean();

      await Content.findById(contentId).updateOne({
        $inc: { like: 1 },
      });

      res
        .status(200)
        .json({ message: '북마크에 추가되었습니다.', isBookmark: !isBookmark });
    } else {
      // 클라이언트에서 isBookmark를 true로 줬다면, 북마크에에서 삭제해준다.

      await User.findById(userId).updateOne({
        $pullAll: { bookmark: [{ contentId }] },
      });

      await Content.findById(contentId).updateOne({
        $inc: { like: -1 },
      });

      res.status(200).json({
        message: '북마크에서 삭제되었습니다.',
        isBookmark: !isBookmark,
      });
    }
  } catch (err) {
    res.status(500).json({ message: '서버문제로 북마크 수정에 실패했습니다.' });
  }
};
