import Destination from '../models/Destination.js';

const geocodeAndSave = async (destination) => {
    if (!destination.coordinates || destination.coordinates.length < 2) {
        const query = `${destination.name}, ${destination.city}, ${destination.state}`;
        const mapboxToken = process.env.MAPBOX_TOKEN;
        if (!mapboxToken) return destination;

        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=1`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.features && data.features.length > 0) {
                const center = data.features[0].center; // [lng, lat]
                destination.coordinates = center;
                await destination.save();
            }
        } catch (error) {
            console.error('Geocoding error:', error.message);
        }
    }
    return destination;
};

// @desc    Get all destinations
// @route   GET /destinations
// @access  Public
const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find()
            .populate('hotels')
            .populate('flights');
            
        // Process any missing coordinates
        const updatedDestinations = await Promise.all(
            destinations.map(dest => geocodeAndSave(dest))
        );
        res.json(updatedDestinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single destination
// @route   GET /destinations/:id
// @access  Public
const getDestinationById = async (req, res) => {
    try {
        let destination = await Destination.findById(req.params.id)
            .populate('hotels')
            .populate('flights');

        if (destination) {
            destination = await geocodeAndSave(destination);
            res.json(destination);
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getDestinations,
    getDestinationById,
};
