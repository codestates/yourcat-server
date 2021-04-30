const upload = require('../../lib/multer');

module.exports = (req, res) => {
  // 가져온 이미지를 uploads폴더에 저장한다.
  upload(req, res, err => {
    if (err) {
      return res
        .status(500)
        .json({ message: '이미지 업로드에 실패했습니다.', err });
    }
    return res.status(200).json({
      message: '이미지가 업로드되었습니다.',
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};
