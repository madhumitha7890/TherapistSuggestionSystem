
// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/index');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('received credentials are: ', { username, email, password });
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    console.log('Existing user:', existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', details: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username, // Changed from name to username

      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Protected route to get user details
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
