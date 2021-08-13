const express = require('express');

const router = express.Router();
const uploadImage = require('../middlewares/uploadImage');

// * POST /images/upload
router.post('/upload', uploadImage);
module.exports = router;
