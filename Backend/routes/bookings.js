import express from 'express';
const router = express.Router();
import { createBooking, getMyBookings } from '../controllers/booking.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);

export default router;
