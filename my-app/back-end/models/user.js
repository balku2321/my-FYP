const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user'], default: 'user' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
