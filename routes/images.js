const express = require('express');

const router = express.Router();
const controller = require('../controller/images');

router.post('/upload', controller.upload);
module.exports = router;
