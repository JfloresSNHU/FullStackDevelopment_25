const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { requireAuth } = require('../middleware/auth'); 

// Public routes
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripByCode);

// Protected routes
router.post('/trips', requireAuth, tripsController.addTrip);
router.put('/trips/:tripCode', requireAuth, tripsController.updateTrip);
router.delete('/trips/:tripCode', requireAuth, tripsController.deleteTrip);

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

