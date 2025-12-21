const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Register new admin
// @route   POST /auth/register-admin
// @access  Public
const registerAdmin = async (req, res) => {
    const { name, email, password, secretKey } = req.body;

    // Simple security check for admin creation - optional but recommended
    // For now, allowing anyone to register as admin for demo purposes as requested
    // if (secretKey !== process.env.ADMIN_SECRET_KEY) return res.status(403).json({ message: 'Not authorized' })

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
    });

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};

// @desc    Authenticate a user or admin
// @route   POST /auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Check User Collection
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: 'USER', // Ensure role is explicitly USER (or come from DB if updated)
            token: generateToken(user.id),
        });
    }

    // 2. Check Admin Collection (only if User login failed)
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        return res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            role: 'ADMIN', // Ensure role is explicitly ADMIN
            token: generateToken(admin.id),
        });
    }

    res.status(400).json({ message: 'Invalid credentials' });
};

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
};
