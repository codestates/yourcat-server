const Content = require('../models/Content');
const User = require('../models/User');

module.exports = async (idType, id) => {
  // idType에는 user 혹은 content가 들어온다.
  // id에는 userId 혹은 contentId가 들어온다.

  let imageURL = '';
  // 1. idType이 user인 경우
  // DB.users collection에 저장된 user의 catInfo안의 image에서 S3에 저장된 이름을 return한다.
  if (idType === 'user') {
    const userInfo = await User.findById(id).select('-_id catInfo').lean();
    imageURL = userInfo.catInfo.image;

    // 2. idType이 content인 경우
    // DB.contents collection에 저장된 content의 image에서 S3에 저장된 이름을 return한다.
  } else if (idType === 'content') {
    imageURL = await Content.findById(id).select('-_id image').lean();
    imageURL = imageURL.image;
  } else {
    console.log('util_get함수에 넣은 idType을 확인해주세요.');
  }
  const imageURLSplit = imageURL.split('/');
  const imageName = imageURLSplit[imageURLSplit.length - 1];
  return imageName;
};
