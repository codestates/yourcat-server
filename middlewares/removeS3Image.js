const { s3 } = require('../lib/multer');

module.exports = (req, res) => {
  const { where, imageName } = req.image;

  // S3의 버킷/images의 해당 이미지 제거
  if (imageName) {
    s3.deleteObject(
      {
        Bucket: `${process.env.AWS_BUCKET_NAME}/images`,
        Key: imageName,
      },
      err => {
        if (err) {
          if (where === 'content') {
            res.status(500).json({
              message:
                '글은 삭제되었으나, 클라우드서버의 이미지파일 삭제에는 실패했습니다.',
              err,
            });
          } else {
            res.status(500).json({
              message:
                '회원탈퇴는 완료되었으나, 클라우드서버의 cat이미지파일 삭제에는 실패했습니다.',
              err,
            });
          }
        } else if (where === 'content') {
          res.status(200).json({ message: '글이 완전히 삭제되었습니다.' });
        } else {
          res.status(200).json({ message: '회원탈퇴가 완료되었습니다.' });
        }
      },
    );
  } else if (where === 'content') {
    res.status(200).json({ message: '글이 완전히 삭제되었습니다.' });
  } else {
    res.status(200).json({ message: '회원탈퇴가 완료되었습니다.' });
  }
};
