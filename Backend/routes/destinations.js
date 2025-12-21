import express from 'express';
const router = express.Router();
import { getDestinations, getDestinationById } from '../controllers/destination.controller.js';

router.get('/', getDestinations);
router.get('/:id', getDestinationById);

export default router;
