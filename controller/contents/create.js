const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    const { title, category, description, image } = req.body;
    const { _id: userId } = req.user;

    // 4가지 카테고리 해당하는지 유효성 확인
    const categoryList = ['general', 'question', 'knowhow', 'photo'];
    const isCategory = categoryList.indexOf(category) !== -1;
    if (!isCategory) {
      res.status(400).json({ message: '유효하지않은 카테고리입니다.' });
    } else {
      const newContent = new Content({
        title,
        category,
        description,
        image,
        userId,
      });

      await newContent.save();

      // 만들어진 글의 _id를 contentId에 저장해서 클라이언트에 보내준다.
      const contentId = newContent.id;
      res
        .status(200)
        .json({ message: '새로운 글이 작성되었습니다.', contentId });
    }
  } catch (err) {
    res.status(500).json({ message: '서버문제로 글 작성에 실패했습니다.' });
  }
};
