const aiService = require('../services/aiServices');
const { Food } = require('../models');
const { Op } = require('sequelize');

// @desc    Get AI-powered food recommendations
// @route   POST /api/ai/recommendations
// @access  Private (Authenticated users)
const getRecommendations = async (req, res) => {
  try {
    const { budget, preferences } = req.body;

    // Validation
    if (!budget || budget <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid budget is required (must be greater than 0)'
      });
    }

    // Get all available foods from database
    const availableFoods = await Food.findAll({
      where: {
        isActive: true,
        status: 'available'
      },
      attributes: ['id', 'name', 'category', 'price', 'unit', 'quantity'],
      raw: true
    });

    if (availableFoods.length === 0) {
      return res.json({
        success: true,
        data: {
          recommended_basket: [],
          total_cost: 0,
          budget: budget,
          message: 'No foods currently available'
        }
      });
    }

    // Call AI service
    const aiResponse = await aiService.getRecommendations(
      budget,
      preferences || [],
      availableFoods
    );

    // If AI service failed, use simple fallback
    if (aiResponse.fallback || !aiResponse.success) {
      console.log('Using fallback recommendations...');
      
      // Simple fallback: cheapest foods within budget
      const fallbackFoods = await Food.findAll({
        where: {
          price: { [Op.lte]: budget },
          isActive: true,
          status: 'available'
        },
        limit: 5,
        order: [['price', 'ASC']],
        attributes: ['id', 'name', 'category', 'price', 'unit']
      });

      const basket = fallbackFoods.map(f => ({
        food_id: f.id,
        name: f.name,
        category: f.category,
        price: parseFloat(f.price),
        quantity: 1,
        unit: f.unit
      }));

      const totalCost = basket.reduce((sum, item) => sum + item.price, 0);

      return res.json({
        success: true,
        message: 'Using basic recommendations (AI service temporarily unavailable)',
        data: {
          recommended_basket: basket,
          total_cost: totalCost,
          budget: budget,
          savings: budget - totalCost,
          usingFallback: true
        }
      });
    }

    // Return AI recommendations
    res.json({
      success: true,
      data: aiResponse.data
    });

  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message
    });
  }
};

// @desc    Get demand forecast for seller
// @route   POST /api/ai/seller/forecast
// @access  Private (Sellers only)
const getSellerForecast = async (req, res) => {
  try {
    // For now, we'll return a message that sales data is needed
    // In production, you'd track actual sales in a Sales model
    
    return res.json({
      success: true,
      message: 'Forecast feature requires sales data. This will be available once you have sales history.',
      data: {
        seller_id: req.user.id,
        note: 'Make some sales first, then forecasts will be generated based on your sales history'
      }
    });

  } catch (error) {
    console.error('Forecast error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating forecast',
      error: error.message
    });
  }
};

// @desc    Get seller insights
// @route   GET /api/ai/seller/insights
// @access  Private (Sellers only)
const getSellerInsights = async (req, res) => {
  try {
    // Get seller's food listings
    const sellerFoods = await Food.findAll({
      where: {
        sellerId: req.user.id,
        isActive: true
      },
      attributes: ['id', 'name', 'category', 'price', 'quantity', 'status']
    });

    if (sellerFoods.length === 0) {
      return res.json({
        success: true,
        data: {
          total_listings: 0,
          categories: [],
          message: 'No listings yet. Create your first food listing to see insights!'
        }
      });
    }

    // Calculate basic insights
    const insights = {
      total_listings: sellerFoods.length,
      available_listings: sellerFoods.filter(f => f.status === 'available').length,
      out_of_stock: sellerFoods.filter(f => f.status === 'out_of_stock').length,
      surplus_items: sellerFoods.filter(f => f.status === 'surplus').length,
      categories: [...new Set(sellerFoods.map(f => f.category))],
      total_inventory_value: sellerFoods.reduce((sum, f) => 
        sum + (parseFloat(f.price) * parseFloat(f.quantity)), 0
      )
    };

    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating insights',
      error: error.message
    });
  }
};

module.exports = {
  getRecommendations,
  getSellerForecast,
  getSellerInsights
};