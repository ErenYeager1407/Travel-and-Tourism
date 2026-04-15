import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination.js';

dotenv.config();

const updateCoordinates = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const destinations = await Destination.find({});
        const mapboxToken = process.env.MAPBOX_TOKEN;

        if (!mapboxToken) {
            console.error('MAPBOX_TOKEN is missing in .env');
            process.exit(1);
        }

        let updatedCount = 0;

        for (const destination of destinations) {
            if (!destination.coordinates || destination.coordinates.length < 2) {
                const query = `${destination.name}, ${destination.city}, ${destination.state}`;
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=1`;
                
                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.features && data.features.length > 0) {
                        const center = data.features[0].center; // [lng, lat]
                        
                        await Destination.updateOne(
                            { _id: destination._id },
                            { $set: { coordinates: center } }
                        );
                        console.log(`Updated coordinates for ${destination.name}`);
                        updatedCount++;
                    } else {
                        console.log(`No coordinates found for ${destination.name}`);
                    }
                } catch (error) {
                    console.error(`Failed to geocode ${destination.name}:`, error.message);
                }
            } else {
                console.log(`Coordinates already exist for ${destination.name}`);
            }
        }

        console.log(`Successfully updated ${updatedCount} destinations.`);
        process.exit(0);

    } catch (error) {
        console.error('Error updating coordinates:', error.message);
        process.exit(1);
    }
};

updateCoordinates();
