const Content = require('../../models/Content');

module.exports = async (req, res) => {
  try {
    // 1. GET요청 URL의 :contentId와 일치하는 글을 찾는다.
    const { contentId } = req.params;
    const content = await Content.findOne({ _id: contentId })
      .populate({
        path: 'userId',
        select: ' nickname catInfo',
      })
      .populate({
        path: 'comment',
        populate: { path: 'userId', select: '_id nickname catInfo' },
      })
      .lean();
    const {
      like,
      title,
      category,
      description,
      image: contentImage,
      userId: { _id: userId, nickname: userName },
      createdAt,
      updatedAt,
    } = content;

    const userImage = content.userId.catInfo
      ? content.userId.catInfo.image
      : undefined;

    const comment = content.comment.map(el => {
      return {
        commentId: el._id,
        commentImage: el.userId.catInfo.image,
        commentUserId: el.userId._id,
        commentUserName: el.userId.nickname,
        description: el.description,
      };
    });
    const contentInfo = {
      contentId: content._id,
      title,
      category,
      description,
      like,
      contentImage,
      user: { userId, userName, userImage },
      comment,
      createdAt,
      updatedAt,
    };

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
