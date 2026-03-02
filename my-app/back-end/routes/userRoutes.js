const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');
const Farmer = require('../models/Farmer');
const Admin = require('../models/Admin');
const router = express.Router();

// Route to fetch current user details
router.get('/me', authMiddleware(['user', 'farmer', 'admin']), async (req, res) => {
  try {
    let user;
    if (req.user.role === 'user') {
      user = await User.findById(req.user.id).select('-password');
    } else if (req.user.role === 'farmer') {
      user = await Farmer.findById(req.user.id).select('-password');
    } else if (req.user.role === 'admin') {
      user = await Admin.findById(req.user.id).select('-password');
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err); // For debugging purposes
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Admin-only route: Fetch all users, farmers, and admins
router.get('/all', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const farmers = await Farmer.find().select('-password');
    const admins = await Admin.find().select('-password');

    res.json({
      users: users || [],
      farmers: farmers || [],
      admins: admins || [],
    });
  } catch (err) {
    console.error(err); // For debugging purposes
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
