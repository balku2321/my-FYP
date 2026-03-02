const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      price,
      quantity,
      category,
      weight,
      availableDate,
      expirationDate,
      condition,
      unit,
      location,
      delivery,
      tags,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
      quantity,
      category,
      weight,
      availableDate,
      expirationDate,
      condition,
      unit,
      location,
      delivery,
      tags,
      farmerId: req.user.userId,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// Get products by Farmer ID
exports.getProductsByFarmer = async (req, res) => {
  try {
    const farmerId = req.user.userId;
    const products = await Product.find({ farmerId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this farmer' });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching farmer products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
