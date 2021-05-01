const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const {
  usersRouter,
  contentsRouter,
  testRouter,
  imageRouter,
} = require('./routes');

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
// 이미지와 같은 정적파일을 제공하기위한 미들웨어 static
app.use(express.static('uploads'));
app.use('/users', usersRouter);
app.use('/contents', contentsRouter);
app.use('/test', testRouter);
app.use('/images', imageRouter);

// 이미지와 같은 정적파일을 제공하기위한 미들웨어 static
app.use(express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: '연결되었습니다.' });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
