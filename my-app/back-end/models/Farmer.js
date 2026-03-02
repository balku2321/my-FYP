const mongoose = require('mongoose');

// Define the Farmer schema
const FarmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  farmName: { type: String, required: true },
  farmAddress: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['farmer'], default: 'farmer' },
  products: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], default: [] },
});

const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer;
