const fs = require('fs');
const path = require('path');

module.exports.travel = function(req, res) {
  const dataPath = path.join(__dirname, '../../data/trips.json');
  const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  res.render('travel', {
    title: 'Travel Destinations',
    trips
  });
};
