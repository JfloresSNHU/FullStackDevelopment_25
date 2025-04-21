const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');



router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripByCode);
router.post('/trips', tripsController.addTrip);
router.put('/trips/:tripCode', tripsController.updateTrip);
router.delete('/trips/:tripCode', tripsController.deleteTrip);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
