const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
const Flight = require('../models/Flight');

// @desc    Create new destination
// @route   POST /admin/destination
// @access  Private/Admin
const createDestination = async (req, res) => {
    const { name, city, state, description, images, basePrice, tags } = req.body;

    try {
        const destination = await Destination.create({
            name,
            city,
            state,
            description,
            images,
            basePrice,
            tags,
            createdBy: req.user.id
        });
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete destination
// @route   DELETE /admin/destination/:id
// @access  Private/Admin
const deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);

        if (destination) {
            await destination.deleteOne();
            res.json({ message: 'Destination removed' });
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update destination
// @route   PUT /admin/destination/:id
// @access  Private/Admin
const updateDestination = async (req, res) => {
    try {
        const { name, city, state, description, images, basePrice, tags } = req.body;
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        destination.name = name || destination.name;
        destination.city = city || destination.city;
        destination.state = state || destination.state;
        destination.description = description || destination.description;
        destination.images = images || destination.images;
        destination.basePrice = basePrice || destination.basePrice;
        destination.tags = tags || destination.tags;

        const updatedDestination = await destination.save();
        res.json(updatedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create new hotel
// @route   POST /admin/hotel
// @access  Private/Admin
const createHotel = async (req, res) => {
    const { name, destinationId, pricePerNight, amenities, images } = req.body;

    try {
        const hotel = await Hotel.create({
            name,
            destination: destinationId,
            pricePerNight,
            amenities,
            images
        });

        // Add hotel to destination
        await Destination.findByIdAndUpdate(destinationId, {
            $push: { hotels: hotel._id }
        });

        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create new flight
// @route   POST /admin/flight
// @access  Private/Admin
const createFlight = async (req, res) => {
    const { airline, destinationId, sourceCity, price, duration } = req.body;

    try {
        const flight = await Flight.create({
            airline,
            destination: destinationId,
            sourceCity,
            price,
            duration
        });

        // Add flight to destination
        await Destination.findByIdAndUpdate(destinationId, {
            $push: { flights: flight._id }
        });

        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all bookings (for admin)
// @route   GET /admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('destination', 'name city state')
            .populate('hotel', 'name pricePerNight')
            .populate('flight', 'airline price')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark booking as completed
// @route   PATCH /admin/bookings/:id/complete
// @access  Private/Admin
const completeBooking = async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'COMPLETED';
        await booking.save();

        res.json({ message: 'Booking marked as completed', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete booking
// @route   DELETE /admin/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Only allow deletion if booking is completed
        if (booking.status !== 'COMPLETED') {
            return res.status(400).json({ message: 'Cannot delete booking. Please mark it as completed first.' });
        }

        await booking.deleteOne();
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDestination,
    deleteDestination,
    updateDestination,
    createHotel,
    createFlight,
    getAllBookings,
    completeBooking,
    deleteBooking
};
