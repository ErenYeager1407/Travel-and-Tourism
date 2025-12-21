
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
        default: 'ADMIN',
        immutable: true
    }
}, {
    timestamps: true, // Optional but good practice
});

export default mongoose.model('Admin', adminSchema);
