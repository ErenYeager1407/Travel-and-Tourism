import express from 'express';
const router = express.Router();
import { registerUser, registerAdmin, loginUser } from '../controllers/auth.controller.js';

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);

export default router;
