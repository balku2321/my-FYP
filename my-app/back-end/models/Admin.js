const mongoose = require('mongoose');

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

module.exports = Admin;
