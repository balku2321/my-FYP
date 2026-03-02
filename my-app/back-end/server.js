const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const authenticateJWT = require('./middleware/authenticateJWT');

// Initialize Express App
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send emails
app.post('/api/contact-us', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Message from: ${name} (${email})\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send message.' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

// Define Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', authenticateJWT, userRoutes); // User-related routes (authenticated)
app.use('/api/farmers', authenticateJWT, farmerRoutes); // Farmer-related routes (authenticated)
app.use('/api/admins', authenticateJWT, adminRoutes); // Admin-related routes
app.use('/api/products', authenticateJWT, productRoutes); // Product-related routes (authenticated)

// Default Route (to check if the server is running)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
