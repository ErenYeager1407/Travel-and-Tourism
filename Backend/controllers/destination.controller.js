// const Destination = require('../models/Destination');
import Destination from '../models/Destination.js';
// @desc    Get all destinations
// @route   GET /destinations
// @access  Public
const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find()
            .populate('hotels')
            .populate('flights');
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single destination
// @route   GET /destinations/:id
// @access  Public
const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id)
            .populate('hotels')
            .populate('flights');

        if (destination) {
            res.json(destination);
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// module.exports = {
//     getDestinations,
//     getDestinationById,
// };
export {
    getDestinations,
    getDestinationById,
};
