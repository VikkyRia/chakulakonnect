const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000/api/ai';

// Get AI-powered food recommendations for consumers
const getRecommendations = async (budget, preferences = [], availableFoods = []) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/recommendations`, {
      budget,
      preferences,
      available_foods: availableFoods
    }, {
      timeout: 10000 // 10 second timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('AI Recommendation Service Error:', error.message);
    return {
      success: false,
      error: 'AI recommendation service unavailable',
      fallback: true
    };
  }
};

// Get seller sales forecast
const getSellerForecast = async (sellerId, salesData, foodData) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/seller/forecast`, {
      seller_id: sellerId,
      sales_data: salesData,
      food_data: foodData
    }, {
      timeout: 15000 // 15 second timeout for ML processing
    });
    
    return response.data;
  } catch (error) {
    console.error('AI Forecast Service Error:', error.message);
    return {
      success: false,
      error: 'AI forecast service unavailable'
    };
  }
};

// Get seller insights (top products, revenue, etc.)
const getSellerInsights = async (sellerId, salesData, foodData) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/seller/insights`, {
      seller_id: sellerId,
      sales_data: salesData,
      food_data: foodData
    }, {
      timeout: 10000
    });
    
    return response.data;
  } catch (error) {
    console.error('AI Insights Service Error:', error.message);
    return {
      success: false,
      error: 'AI insights service unavailable'
    };
  }
};

module.exports = {
  getRecommendations,
  getSellerForecast,
  getSellerInsights
};