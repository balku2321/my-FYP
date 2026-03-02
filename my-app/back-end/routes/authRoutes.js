const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Farmer = require('../models/Farmer');
const Admin = require('../models/Admin'); // Import Admin model

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token required.' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Attach user data to the request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role, farmName, farmAddress, city, phone } = req.body;

    let newUser;
    if (role === 'farmer') {
      if (!farmName || !farmAddress || !city || !phone) {
        return res.status(400).json({ message: 'All farmer details are required.' });
      }

      const existingFarmer = await Farmer.findOne({ email });
      if (existingFarmer) {
        return res.status(400).json({ message: 'Farmer already exists.' });
      }

      newUser = new Farmer({ fullName, email, password, farmName, farmAddress, city, phone, role: 'farmer' });
    } else if (role === 'admin') {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists.' });
      }

      newUser = new Admin({ fullName, email, password, role: 'admin' });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      newUser = new User({ fullName, email, password, role: 'user' });
    }

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: `${role} registered successfully.`, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Admin.findOne({ email });
    if (!user) {
      user = await User.findOne({ email });
      if (!user) {
        user = await Farmer.findOne({ email });
      }
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get User Data (protected route)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    let user = await User.findById(req.user.userId);
    if (!user) {
      user = await Farmer.findById(req.user.userId);
      if (!user) {
        user = await Admin.findById(req.user.userId);
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
