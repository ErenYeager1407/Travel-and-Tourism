import express from 'express';
const router = express.Router();
import { createReview } from '../controllers/review.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post('/', protect, createReview);

export default router;
