const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /bookings
// @access  Private
const createBooking = async (req, res) => {
    const { destination, hotel, flight, startDate, endDate, guests, totalPrice } = req.body;

    try {
        const booking = await Booking.create({
            user: req.user.id,
            destination,
            hotel,
            flight,
            startDate,
            endDate,
            guests,
            totalPrice
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('destination')
            .populate('hotel')
            .populate('flight');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings
};
