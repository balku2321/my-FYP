const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Add user info to request
    next();
  });
};

// Middleware to check if the user is a farmer
const checkFarmerRole = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role !== 'farmer') {
    return res.status(403).json({ message: 'Access denied. Only farmers can perform this action.' });
  }
  next();
};

module.exports = { authenticateJWT, checkFarmerRole };
