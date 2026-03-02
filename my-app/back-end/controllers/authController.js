const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Farmer = require('../models/Farmer');

// Validation Rules
const registerValidationRules = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm password does not match password');
    }
    return true;
  }),
  body('role').isIn(['user', 'farmer']).withMessage('Invalid role'),
  body('farmName')
    .if(body('role').equals('farmer'))
    .notEmpty()
    .withMessage('Farm name is required'),
  body('farmAddress')
    .if(body('role').equals('farmer'))
    .notEmpty()
    .withMessage('Farm address is required'),
  body('city')
    .if(body('role').equals('farmer'))
    .notEmpty()
    .withMessage('City is required'),
  body('phone')
    .if(body('role').equals('farmer'))
    .notEmpty()
    .withMessage('Phone number is required'),
];

const loginValidationRules = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Register User or Farmer
const register = async (req, res) => {
  // Log validation errors if any
  const errors = validationResult(req);
  console.log(errors.array()); // Log the validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, role = 'user', farmName, farmAddress, city, phone } = req.body;

  try {
    let newUser;

    if (role === 'farmer') {
      const existingFarmer = await Farmer.findOne({ email });
      if (existingFarmer) {
        return res.status(400).json({ message: 'Farmer already exists' });
      }

      newUser = new Farmer({
        fullName,
        email,
        password,
        farmName,
        farmAddress,
        city,
        phone,
        role,
      });

      await newUser.save();
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      newUser = new User({
        fullName,
        email,
        password,
        role,
      });

      await newUser.save();
    }

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      token,
      user: { fullName: newUser.fullName, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User or Farmer
const login = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array()); // Log the validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) || await Farmer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  register,
  login,
};
