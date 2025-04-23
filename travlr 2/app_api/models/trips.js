const mongoose = require('mongoose');

if (!mongoose.models.trips) {
  const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    resort: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    nights: { type: Number, required: true },
    image: { type: String, required: true }
  });

  mongoose.model('trips', tripSchema);
}
