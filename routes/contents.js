const express = require('express');

const router = express.Router();
const controller = require('../controller/contents');

router.post('/post', controller.post);

module.exports = router;
