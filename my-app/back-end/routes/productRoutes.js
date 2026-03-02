const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateJWT } = require('../middleware/auth');
const multer = require('multer');
const path = require('path'); // Import the path module

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {  
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the image file to avoid conflicts
  },
});

const upload = multer({ storage: storage });

// Route to create a product (with file upload)
router.post('/', authenticateJWT, upload.single('image'), productController.createProduct);

// Get all products for the logged-in farmer
router.get('/my-products', authenticateJWT, productController.getProductsByFarmer);

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
