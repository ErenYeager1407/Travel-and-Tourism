const express = require('express');
const router = express.Router();
const {
    createDestination,
    deleteDestination,
    updateDestination,
    createHotel,
    createFlight,
    getAllBookings,
    completeBooking,
    deleteBooking
} = require('../controllers/admin.controller');
const { protect } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// All routes here are protected and require admin role
router.use(protect);
router.use(adminMiddleware);

router.post('/destination', createDestination);
router.delete('/destination/:id', deleteDestination);
router.put('/destination/:id', updateDestination);
router.post('/hotel', createHotel);
router.post('/flight', createFlight);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/complete', completeBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;
