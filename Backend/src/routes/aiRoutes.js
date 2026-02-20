const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getSellerForecast,
  getSellerInsights
} = require('../controllers/aiControllers');
const { protect, isSeller } = require('../middleware/authMiddleware');

// Consumer routes
router.post('/recommendations', protect, getRecommendations);

// Seller routes
router.post('/seller/forecast', protect, isSeller, getSellerForecast);
router.get('/seller/insights', protect, isSeller, getSellerInsights);

module.exports = router;