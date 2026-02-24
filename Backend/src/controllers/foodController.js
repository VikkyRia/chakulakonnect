const { Food, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Create new food listing
// @route   POST /api/foods
// @access  Private (Sellers only)
const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      quantity,
      unit,
      images,
      location,
      status,
      nutritionInfo
    } = req.body;

    // Validation
    if (!name || !description || !category || !price || !quantity || !unit || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, category, price, quantity, unit, location'
      });
    }

    // Validate location has required fields
    if (!location.address || !location.city || !location.state) {
      return res.status(400).json({
        success: false,
        message: 'Location must include address, city, and state'
      });
    }

    // Validate images array
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Create food listing
    const food = await Food.create({
      sellerId: req.user.id,
      name,
      description,
      category,
      price,
      quantity,
      unit,
      images,
      location,
      status: status || 'available',
      nutritionInfo
    });

    // Get food with seller info
    const foodWithSeller = await Food.findByPk(food.id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'fullName', 'email', 'phoneNumber']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Food listing created successfully',
      data: {
        food: foodWithSeller
      }
    });

  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating food listing',
      error: error.message
    });
  }
};

// @desc    Get all food listings (with filters)
// @route   GET /api/foods
// @access  Public
const getAllFoods = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      status,
      location,
      search,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const where = {
      isActive: true
    };

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (location) {
      where['location.city'] = { [Op.iLike]: `%${location}%` };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Get foods with seller info
    const { count, rows } = await Food.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'fullName', 'phoneNumber', 'location']
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      data: {
        foods: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food listings',
      error: error.message
    });
  }
};

// @desc    Get single food listing by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findOne({
      where: {
        id: req.params.id,
        isActive: true
      },
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'fullName', 'email', 'phoneNumber', 'location']
      }]
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        food
      }
    });

  } catch (error) {
    console.error('Get food by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food listing',
      error: error.message
    });
  }
};

// @desc    Get seller's own food listings
// @route   GET /api/foods/my-listings
// @access  Private (Sellers only)
const getMyListings = async (req, res) => {
  try {
    const foods = await Food.findAll({
      where: {
        sellerId: req.user.id,
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });

    // Calculate stats
    const stats = {
      totalListings: foods.length,
      availableListings: foods.filter(f => f.status === 'available').length,
      outOfStockListings: foods.filter(f => f.status === 'out_of_stock').length,
      surplusListings: foods.filter(f => f.status === 'surplus').length,
      totalQuantity: foods.reduce((sum, f) => sum + parseFloat(f.quantity), 0)
    };

    res.status(200).json({
      success: true,
      data: {
        listings: foods,
        stats
      }
    });

  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your listings',
      error: error.message
    });
  }
};

// @desc    Update food listing
// @route   PUT /api/foods/:id
// @access  Private (Sellers only - own listings)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food listing not found'
      });
    }

    // Check if user owns this listing
    if (food.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    // Update fields
    const updatedFood = await food.update(req.body);

    // Get updated food with seller info
    const foodWithSeller = await Food.findByPk(updatedFood.id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'fullName', 'email', 'phoneNumber']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Food listing updated successfully',
      data: {
        food: foodWithSeller
      }
    });

  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating food listing',
      error: error.message
    });
  }
};

// @desc    Delete food listing (soft delete)
// @route   DELETE /api/foods/:id
// @access  Private (Sellers only - own listings)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food listing not found'
      });
    }

    // Check if user owns this listing
    if (food.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    // Soft delete (set isActive to false)
    await food.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: 'Food listing deleted successfully'
    });

  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting food listing',
      error: error.message
    });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  getMyListings,
  updateFood,
  deleteFood
};