const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const { param, validationResult } = require('express-validator');

// Fetch farmer data by ID
router.get(
  '/:id',
  [
    param('id', 'Invalid Farmer ID').isMongoId(), // Validate ID
  ],
  async (req, res) => {
    const farmerId = req.params.id;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const farmer = await Farmer.findById(farmerId);
      if (!farmer) {
        return res.status(404).json({ message: 'Farmer not found' });
      }
      res.status(200).json({ success: true, data: farmer });
    } catch (err) {
      console.error('Error fetching farmer:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
