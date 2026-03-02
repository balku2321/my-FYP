// adminRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); // Using bcrypt instead of argon2
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Make sure your Admin model is correct
const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Admin login attempt for email:', email); // Debugging log

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found:', email); // Debugging log
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Invalid password attempt for admin:', email); // Debugging log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your_secret_key', // Use an env variable
      { expiresIn: '1h' }
    );

    console.log('Admin logged in successfully'); // Debugging log
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: Admin registration route (if needed)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      role: role || 'admin',
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    console.error('Error during admin registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;