import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import destinationsRoutes from './routes/destinations.js';
import bookingsRoutes from './routes/bookings.js';
import reviewsRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/destinations', destinationsRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
