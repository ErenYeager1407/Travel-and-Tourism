const Flight = require('../models/Flight');

// @desc    Get flight by ID
// @route   GET /flights/:id
// @access  Public
const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (flight) {
            res.json(flight);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFlightById
};
