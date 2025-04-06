var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');
var travelController = require('../controllers/travel');

/* Route for Home Page */
router.get('/', mainController.index);
router.get('/travel', travelController.travel);
router.get('/travel/:tripCode', travelController.tripDetail);


module.exports = router;
