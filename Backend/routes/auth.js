import express from 'express';
const router = express.Router();
import { registerUser, registerAdmin, loginUser, logoutUser } from '../controllers/auth.controller.js';

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
