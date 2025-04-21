const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripByCode);

router.post('/trips', tripsController.addTrip);
router.put('/trips/:tripCode', tripsController.updateTrip);
router.delete('/trips/:tripCode', tripsController.deleteTrip);

module.exports = router;
