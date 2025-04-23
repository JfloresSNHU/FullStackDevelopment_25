const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET a trip by code
const tripByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: `Trip not found: ${req.params.tripCode}` });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT update a trip (admin only)
const updateTrip = async (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const tripCode = req.params.tripCode;
  if (!tripCode) {
    return res.status(400).json({ message: "Trip code is required" });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.name = req.body.name;
    trip.resort = req.body.resort;
    trip.length = req.body.length;
    trip.perPerson = req.body.perPerson;
    trip.description = req.body.description;
    trip.image = req.body.image;

    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Error updating trip", error: err });
  }
};

// POST create a trip (admin only)
const addTrip = async (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  console.log("Received POST /trips", req.body);

  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      resort: req.body.resort,
      length: req.body.length,
      perPerson: req.body.perPerson,
      description: req.body.description,
      image: req.body.image,
    });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Create trip error:", err.message);
    console.error("Validation errors:", err.errors);
    res.status(400).json({ message: "Failed to create trip", error: err.message });
  }
};

// DELETE a trip (admin only)
const deleteTrip = async (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const tripCode = req.params.tripCode;
  if (!tripCode) {
    return res.status(400).json({ message: "Trip code is required" });
  }

  try {
    const deletedTrip = await Trip.findOneAndDelete({ code: tripCode });
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(204).json(null);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripByCode,
  updateTrip,
  addTrip,
  deleteTrip
};
