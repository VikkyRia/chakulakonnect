const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true,//process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);

// Status check route
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ChakulaKonnect API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

module.exports = app;