import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    amenities: [{
        type: String,
    }],
    images: [{
        type: String,
    }],
    rooms: {
        type: Number,
        required: true,
        default: 50
    }
}, {
    timestamps: true
});

export default mongoose.model('Hotel', hotelSchema);
