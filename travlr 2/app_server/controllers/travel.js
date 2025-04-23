const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

//const fs = require('fs');
//const path = require('path');

const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);
    const trips = await response.json();

    if (!Array.isArray(trips) || trips.length === 0) {
      return res.render('travel', { title: 'Travlr Getaways', message: 'No trips available at the moment.' });
    }

    res.render('travel', { title: 'Travlr Getaways', trips });
  } catch (e) {
    console.error(e);
    res.status(500).render('error', { message: 'API call failed', error: e });
  }
};

const tripDetail = async (req, res) => {
  const tripCode = req.params.tripCode;
  const apiUrl = `http://localhost:3000/api/trips/${tripCode}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(response.status).render('error', {
        message: `Trip ${tripCode} not found`,
        error: { status: response.status }
      });
    }

    const trip = await response.json();
    res.render('trip', { title: trip.name, trip });
  } catch (err) {
    res.status(500).render('error', {
      message: 'Server error',
      error: err
    });
  }
};

module.exports = {
  travel,
  tripDetail
};


