const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const {
  usersRouter,
  contentsRouter,
  imageRouter,
  bookmarkRouter,
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
    origin: process.env.DEFAULT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/contents', contentsRouter);
app.use('/images', imageRouter);
app.use('/bookmarks', bookmarkRouter);

app.get('/', (req, res) => {
  res.json({ message: '연결되었습니다.' });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`),
);
