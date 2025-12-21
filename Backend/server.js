require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/destinations', require('./routes/destinations'));
app.use('/bookings', require('./routes/bookings')); // Changed from /bookings/my to /bookings (and controller handles /my) - wait, route file has /my
// The user requested:
// POST /bookings
// GET /bookings/my
// So if I mount at /bookings:
// POST /bookings/ -> createBooking
// GET /bookings/my -> getMyBookings
// This matches.

app.use('/reviews', require('./routes/reviews'));
// User requested: POST /reviews
// Mount at /reviews: POST /reviews/ -> createReview. Matches.

app.use('/admin', require('./routes/admin'));
// User requested: POST /admin/destination, etc.
// Mount at /admin: POST /admin/destination. Matches.

app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
