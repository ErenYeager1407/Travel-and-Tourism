const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Destination', destinationSchema);
