const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    sourceCity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String, // e.g., "2h 30m"
        required: true,
    },
    seats: {
        type: Number,
        required: true,
        default: 180
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
