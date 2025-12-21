import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED'],
        default: 'CONFIRMED'
    }
}, {
    timestamps: true,
});

export default mongoose.model('Booking', bookingSchema);
