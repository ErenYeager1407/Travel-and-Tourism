import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    appwriteId: {
        type: String,
        // required: false // Optional for now as per plan
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN'] // Just in case, though Admin has separate schema as requested
    },
    savedDestinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    }],
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);
