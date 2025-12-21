const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Get user from the token
            // Check in both User and Admin collections to be safe, or decide based on payload?
            // Usually payload has role or we check both. 
            // Let's assume standard auth flow first tries User, if not found then maybe Admin?
            // OR simpler: The payload should ideally say if it's user or admin.
            // For now, I'll search in User first.

            let user = await User.findById(decoded.id).select('-password');

            if (!user) {
                user = await Admin.findById(decoded.id).select('-password');
            }

            req.user = user;

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
