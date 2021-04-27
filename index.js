const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const { usersRouter, contentsRouter } = require('./routes');
const User = require('./models/User');
const Content = require('./models/Content');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('mongoDB연결 에러 : ', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/contents', contentsRouter);

app.get('/', (req, res) => {
  res.json({ message: '연결되었습니다.' });
});

// app.post('/testNoCat', async (req, res) => {
//   const { email, password, nickname } = req.body;

//   const newUser = new User({
//     nickname,
//     email,
//     password,
//   });

//   await newUser.save();
//   res
//     .status(200)
//     .json({ message: 'success nocat signup~~', userId: newUser._id });
// });
/* { "_id" : ObjectId("6087d2dd26113d588ebfa2e7"), "nickname" : "순기", "email" : "test1@naver.com", "password" : "good1234", "bookmark" : [ ], "createdAt" : ISODate("2021-04-27T09:01:17.713Z"), "updatedAt" : ISODate("2021-04-27T09:01:17.713Z"), "__v" : 0 } */

// app.post('/test/queryUserInfo', (req, res) => {});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
