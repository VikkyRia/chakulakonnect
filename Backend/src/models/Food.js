const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Food model
const Food = sequelize.define('Food', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM(
      'Vegetables',
      'Fruits',
      'Grains',
      'Proteins',
      'Dairy',
      'Legumes',
      'Tubers',
      'Spices',
      'Other'
    ),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    },
    comment: 'Price in Naira'
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'litre', 'ml', 'pieces', 'bags', 'bunches', 'dozen'),
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
    allowNull: false
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Seller location for this listing'
  },
  status: {
    type: DataTypes.ENUM('available', 'out_of_stock', 'surplus'),
    allowNull: false,
    defaultValue: 'available'
  },
  nutritionInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Nutritional information (calories, protein, carbs, etc.)'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Soft delete flag'
  }
}, {
  timestamps: true,
  tableName: 'foods'
});

module.exports = Food;