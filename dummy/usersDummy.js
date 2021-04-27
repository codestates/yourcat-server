module.exports = {
  req: {
    accessToken: '토큰11',
    email: 'kimcoding@google.com',
    password: '1234',
  },

  // TODO: createdAt, updatedAt도 줘야하나? ISODate로 저장되는데, sort로 정렬가능할까?
  // TODO: API에 cats도 만들어야하나? cats/register, cats/edit, cats/delete
  res: {
    _id: 'user1234',
    email: 'kimcoding@google.com',
    password: '1234',
    nickname: '영호님짱',
    bookmark: [{ contentId: 'content21' }, { contentId: 'content29' }],
    catInfo: {
      name: '냐옹이',
      age: '18',
      gender: 'male',
      image: 'image123.jpg',
    },
  },
};
