const express = require('express');
const router = express.Router();
const {
  createFood,
  getAllFoods,
  getFoodById,
  getMyListings,
  updateFood,
  deleteFood
} = require('../controllers/foodController');
const { protect, isSeller } = require('../middleware/authMiddleware');

// IMPORTANT: Specific routes BEFORE parameterized routes

// Seller-only routes (must come before /:id route)
router.post('/', protect, isSeller, createFood);                          // Create food listing
router.get('/seller/my-listings', protect, isSeller, getMyListings);     // Seller's dashboard

// Public routes
router.get('/', getAllFoods);                                             // Browse all foods
router.get('/:id', getFoodById);                                          // View single food

// Protected update/delete routes
router.put('/:id', protect, isSeller, updateFood);                        // Update food listing
router.delete('/:id', protect, isSeller, deleteFood);                     // Delete food listing

module.exports = router;