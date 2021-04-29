const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { category } = req.params;

    const categoryList = ['general', 'question', 'knowhow', 'photo'];
    const isCategory = categoryList.indexOf(category) !== -1;

    if (!isCategory) {
      res.status(400).json({ message: '유효하지않은 카테고리입니다.' });
    } else {
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;

      const contentsList = await Content.find({ category })
        .populate('userId')
        .skip(skip)
        .limit(limit)
        .lean();

      const contentsLength = contentsList.length;
      res.json({
        contentsList,
        contentsLength,
        message: '해당 카테고리의 게시글을 불러오는데 성공했습니다.',
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: '서버문제로 게시글을 불러오는데 실패했습니다.', err });
  }
};
