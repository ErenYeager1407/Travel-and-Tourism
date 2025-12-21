import express from 'express';
const router = express.Router();
import {
    createDestination,
    deleteDestination,
    updateDestination,
    createHotel,
    createFlight,
    getAllBookings,
    completeBooking,
    deleteBooking
} from '../controllers/admin.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

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

export default router;
