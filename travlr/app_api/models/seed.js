const fs = require('fs');
const path = require('path');
const mongoose = require('./db');
const Trip = mongoose.model('trips');

const tripsFilePath = path.join(__dirname, '../../data/trips.json');
const tripsData = JSON.parse(fs.readFileSync(tripsFilePath, 'utf8'));

Trip.deleteMany({})
  .then(() => Trip.insertMany(tripsData))
  .then(() => {
    console.log('Trips data successfully seeded!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding trips:', err);
    mongoose.connection.close();
  });
