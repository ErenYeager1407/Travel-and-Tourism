import Destination from '../models/Destination.js';
import Hotel from '../models/Hotel.js';
import Flight from '../models/Flight.js';
import FlightBooking from '../models/FlightBooking.js';
import HotelBooking from '../models/HotelBooking.js';
import axios from 'axios';

export const bulkAddDestinations = async (req, res) => {
    try {
        const destinations = req.body;

        const inserted = await Destination.insertMany(destinations);

        res.status(201).json({
            success: true,
            message: `${inserted.length} destinations added successfully`,
            data: inserted
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const recalculateDestinationCost = async (destinationId) => {
    try {
        const destination = await Destination.findById(destinationId).populate('hotels').populate('flights');
        if (!destination) return;

        let minFlightPrice = 0;
        if (destination.flights && destination.flights.length > 0) {
            minFlightPrice = Math.min(...destination.flights.map(f => f.price));
        }

        let minHotelPrice = 0;
        if (destination.hotels && destination.hotels.length > 0) {
            minHotelPrice = Math.min(...destination.hotels.map(h => h.pricePerNight));
        }

        const tripDuration = destination.tripDuration || 3;
        
        let budgetAllowance = 3500; // Medium default
        if (destination.budgetCategory === 'Low') budgetAllowance = 2000;
        else if (destination.budgetCategory === 'High') budgetAllowance = 5000;

        const estimatedTripCost = (minFlightPrice * 2) + (minHotelPrice * tripDuration) + budgetAllowance;

        destination.estimatedTripCost = estimatedTripCost;
        await destination.save();
    } catch (error) {
        console.error("Failed to recalculate cost:", error);
    }
};

// @desc    Create new destination
// @route   POST /admin/destination
// @access  Private/Admin
const createDestination = async (req, res) => {
    console.log("CREATE DESTINATION CONTROLLER HIT");
    const { 
        name, city, state, description, images, basePrice, tags,
        bestSeasons, activities, tripDuration, budgetCategory, suitableFor,
        crowdLevel, popularityScore, offbeatScore, averageTemperature,
        nearestAirport, bestMonths, recommendationReason
    } = req.body;

    try {
        const query = `${name}, ${city}, ${state}, India`;
        
        console.log("QUERY:", query);
        console.log("MAPBOX TOKEN:", process.env.MAPBOX_TOKEN);

        if (!process.env.MAPBOX_TOKEN) {
            throw new Error("MAPBOX_TOKEN is missing");
        }

        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.MAPBOX_TOKEN}`
        );

        console.log("MAPBOX RESPONSE:", response.data);

        if (!response.data.features || response.data.features.length === 0) {
            return res.status(400).json({
                message: "Geocoding failed. Try a more specific location."
            });
        }

        const [lng, lat] = response.data.features[0].center;
        
        if (!lng || !lat) {
            return res.status(400).json({
                message: "Invalid coordinates"
            });
        }

        const destination = await Destination.create({
            name,
            city,
            state,
            description,
            images,
            basePrice,
            tags,
            bestSeasons,
            activities,
            tripDuration,
            budgetCategory,
            suitableFor,
            crowdLevel,
            popularityScore,
            offbeatScore,
            averageTemperature,
            nearestAirport,
            bestMonths,
            recommendationReason,
            coordinates: [lng, lat],
            createdBy: req.user.id
        });
        
        res.status(201).json({ ...destination.toObject(), debug_coordinates: [lng, lat] });
    } catch (error) {
        console.error("Creation error:", error.message);
        res.status(400).json({ message: error.message || "Failed to create destination." });
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
        const { 
            name, city, state, description, images, basePrice, tags,
            bestSeasons, activities, tripDuration, budgetCategory, suitableFor,
            crowdLevel, popularityScore, offbeatScore, averageTemperature,
            nearestAirport, bestMonths, recommendationReason
        } = req.body;
        
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        destination.name = name || destination.name;
        destination.city = city || destination.city;
        destination.state = state || destination.state;
        destination.description = description || destination.description;
        if (images !== undefined) {
            destination.images = images;
            destination.markModified('images');
        }
        if (basePrice !== undefined) destination.basePrice = basePrice;
        if (tags !== undefined) destination.tags = tags;
        
        if (bestSeasons !== undefined) destination.bestSeasons = bestSeasons;
        if (activities !== undefined) destination.activities = activities;
        if (tripDuration !== undefined) destination.tripDuration = tripDuration;
        if (budgetCategory !== undefined) destination.budgetCategory = budgetCategory;
        if (suitableFor !== undefined) destination.suitableFor = suitableFor;
        if (crowdLevel !== undefined) destination.crowdLevel = crowdLevel;
        if (popularityScore !== undefined) destination.popularityScore = popularityScore;
        if (offbeatScore !== undefined) destination.offbeatScore = offbeatScore;
        if (averageTemperature !== undefined) destination.averageTemperature = averageTemperature;
        if (nearestAirport !== undefined) destination.nearestAirport = nearestAirport;
        if (bestMonths !== undefined) destination.bestMonths = bestMonths;
        if (recommendationReason !== undefined) destination.recommendationReason = recommendationReason;

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

        await recalculateDestinationCost(destinationId);

        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create new flight
// @route   POST /admin/flight
// @access  Private/Admin
const createFlight = async (req, res) => {
    const { airline, destinationId, sourceCity, price, duration, startTime } = req.body;

    try {
        const flight = await Flight.create({
            airline,
            destination: destinationId,
            sourceCity,
            price,
            duration,
            startTime
        });

        // Add flight to destination
        await Destination.findByIdAndUpdate(destinationId, {
            $push: { flights: flight._id }
        });
        
        await recalculateDestinationCost(destinationId);

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
        const flightBookings = await FlightBooking.find()
            .populate('user', 'name email')
            .populate('destination', 'name city state')
            .populate('flight', 'airline price')
            .lean();

        const hotelBookings = await HotelBooking.find()
            .populate('user', 'name email')
            .populate('destination', 'name city state')
            .populate('hotel', 'name pricePerNight')
            .lean();

        // Merge and sort both sets by createdAt descending
        const bookings = [...flightBookings, ...hotelBookings].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

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
        // Attempt to find in FlightBooking first
        let booking = await FlightBooking.findById(req.params.id);
        
        if (!booking) {
            // Attempt to find in HotelBooking
            booking = await HotelBooking.findById(req.params.id);
        }

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
        // Attempt to find in FlightBooking first
        let booking = await FlightBooking.findById(req.params.id);
        
        if (!booking) {
            // Attempt to find in HotelBooking
            booking = await HotelBooking.findById(req.params.id);
        }

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

export {
    createDestination,
    deleteDestination,
    updateDestination,
    createHotel,
    createFlight,
    getAllBookings,
    completeBooking,
    deleteBooking
};
