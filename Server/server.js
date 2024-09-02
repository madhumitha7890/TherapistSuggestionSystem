const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const config = require('./config/index'); 
const therapistRoutes=require('./routes/therapists');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log MongoDB URI for debugging
console.log('MongoDB URI:', config.mongoURI);

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/therapists', therapistRoutes);
// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
