import Hotel from '../models/Hotel.js';

// @desc    Get hotel by ID
// @route   GET /hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getHotelById
};
