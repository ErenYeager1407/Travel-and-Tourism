import FlightBooking from '../models/FlightBooking.js';
import HotelBooking from '../models/HotelBooking.js';

// @desc    Create new booking
// @route   POST /bookings
// @access  Private
const createBooking = async (req, res) => {
    const { destination, hotel, flight, startDate, endDate, guests, flightDate, passengers, totalPrice } = req.body;

    try {
        let booking;
        if (flight) {
            // Create a FlightBooking
            booking = await FlightBooking.create({
                user: req.user.id,
                destination,
                flight,
                flightDate: flightDate || startDate, // handle both custom & fallback date fields
                passengers: passengers || guests || 1,
                totalPrice
            });
        } else if (hotel) {
            // Create a HotelBooking
            booking = await HotelBooking.create({
                user: req.user.id,
                destination,
                hotel,
                startDate,
                endDate,
                guests: guests || 1,
                totalPrice
            });
        } else {
            return res.status(400).json({ message: 'Invalid booking request: must specify a flight or hotel' });
        }

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
        const flightBookings = await FlightBooking.find({ user: req.user.id })
            .populate('destination')
            .populate('flight');
            
        const hotelBookings = await HotelBooking.find({ user: req.user.id })
            .populate('destination')
            .populate('hotel');

        // Combine and sort by createdAt descending
        const bookings = [...flightBookings, ...hotelBookings].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createBooking,
    getMyBookings
};
