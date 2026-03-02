const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer'); // Import the Farmer model
const Admin = require('../models/Admin'); // Assuming you have an Admin model

// Middleware to authenticate user using JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    req.user = decoded; // Attach decoded user data to request
    console.log('User Data Attached to Request:', req.user);
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user has the required role
const checkRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized. Token missing or invalid.' });
    }

    try {
      let user;
      // Check if the user is a Farmer
      if (roles.includes('farmer')) {
        user = await Farmer.findById(req.user.userId);
        if (!user) {
          return res.status(403).json({ message: 'Access denied. Farmer role required.' });
        }
        req.user = user; // Attach farmer document to the request
      }
      // Check if the user is an Admin
      else if (roles.includes('admin')) {
        user = await Admin.findById(req.user.userId); // Assuming you have an Admin model
        if (!user) {
          return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        req.user = user; // Attach admin document to the request
      }
      
      // If role doesn't match the user type
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Forbidden. Only ${roles.join(" or ")} can access this route.` });
      }

      next();
    } catch (err) {
      console.error('Error in checkRole:', err.message);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
};

module.exports = { authenticateJWT, checkRole };
