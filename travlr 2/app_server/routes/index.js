const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('trips'); // This should match your schema registration

// Home route - render trip list using Handlebars
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.render('index', { title: 'Welcome to Travlr', trips });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).render('error', { message: 'Failed to load trips', error: err });
  }
});

module.exports = router;
