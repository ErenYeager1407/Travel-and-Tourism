const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/upload.controller');
const { protect } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/upload');

router.post('/', protect, adminMiddleware, upload.single('image'), uploadImage);

module.exports = router;
