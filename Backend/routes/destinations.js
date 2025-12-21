const express = require('express');
const router = express.Router();
const { getDestinations, getDestinationById } = require('../controllers/destination.controller');

router.get('/', getDestinations);
router.get('/:id', getDestinationById);

module.exports = router;
