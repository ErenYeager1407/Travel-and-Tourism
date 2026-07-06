/**
 * recommendation.routes.js
 * Route definitions for recommendations API.
 */

import express from 'express';
import { recommendDestinations } from '../controllers/recommendation.controller.js';

const router = express.Router();

// Define POST /api/recommend endpoint
router.post('/recommend', recommendDestinations);

export default router;
