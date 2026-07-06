import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    // ==========================
    // Existing Fields (Keep Same)
    // ==========================
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: false
    },
    images: [{
        type: String,
    }],
    basePrice: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    tags: [{
        type: String,
    }],
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }],
    flights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    // ==========================
    // Recommendation Fields
    // ==========================

    // Best seasons to visit
    bestSeasons: [{
        type: String,
        enum: ["Spring", "Summer", "Monsoon", "Autumn", "Winter"]
    }],

    // Activities available
    activities: [{
        type: String,
        enum: [
            "Adventure",
            "Nature",
            "Wildlife",
            "Beach",
            "Mountains",
            "Trekking",
            "Camping",
            "Photography",
            "Heritage",
            "Religious",
            "Food",
            "Shopping",
            "Nightlife",
            "Water Sports"
        ]
    }],

    // Ideal travel duration
    tripDuration: {
        type: Number, // in days
        default: 2
    },

    // Budget category
    budgetCategory: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    // Suitable for
    suitableFor: [{
        type: String,
        enum: [
            "Solo",
            "Couple",
            "Friends",
            "Family"
        ]
    }],

    // Crowd level
    crowdLevel: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    // Recommendation Scores
    popularityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },

    offbeatScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },

    // Average estimated cost
    estimatedTripCost: {
        type: Number,
        default: 0
    },

    // Average weather
    averageTemperature: {
        type: Number
    },

    // Nearby airport
    nearestAirport: {
        type: String
    },

    // Travel months
    bestMonths: [{
        type: String
    }],

    // Short recommendation sentence
    recommendationReason: {
        type: String
    }

}, {
    timestamps: true,
});

export default mongoose.model('Destination', destinationSchema);