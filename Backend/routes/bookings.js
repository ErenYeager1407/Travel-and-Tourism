const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/booking.controller');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);

module.exports = router;
