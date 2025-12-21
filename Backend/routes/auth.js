const express = require('express');
const router = express.Router();
const { registerUser, registerAdmin, loginUser } = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);

module.exports = router;
