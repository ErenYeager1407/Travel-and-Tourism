import express from 'express';
const router = express.Router();
import { uploadImage } from '../controllers/upload.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import upload from '../middlewares/upload.js';

router.post('/', protect, adminMiddleware, upload.single('image'), uploadImage);

export default router;
