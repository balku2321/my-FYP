const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Image filename stored here
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  weight: { type: Number },
  availableDate: { type: Date },
  expirationDate: { type: Date },
  condition: { type: String },
  unit: { type: String },
  location: { type: String },
  delivery: { type: Boolean },
  tags: { type: [String] },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true }, // Reference to the farmer
});

// Ensuring farmer reference is populated by default when querying products
productSchema.pre('find', function() {
  this.populate('farmerId'); // Automatically populate farmerId when finding products
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
