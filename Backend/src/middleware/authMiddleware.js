const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized - Invalid token'
    });
  }
};

// Check if user is a seller
const isSeller = (req, res, next) => {
  if (req.user.userType !== 'seller') {
    return res.status(403).json({
      success: false,
      message: 'Access denied - Sellers only'
    });
  }
  next();
};

// Check if user is a consumer
const isConsumer = (req, res, next) => {
  if (req.user.userType !== 'consumer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied - Consumers only'
    });
  }
  next();
};

module.exports = {
  protect,
  isSeller,
  isConsumer
};