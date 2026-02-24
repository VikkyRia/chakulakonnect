const User = require('./user');
const Food = require('./Food');

// Define relationships
// One User (seller) can have many Food listings
User.hasMany(Food, {
  foreignKey: 'sellerId',
  as: 'listings'
});

// Each Food listing belongs to one User (seller)
Food.belongsTo(User, {
  foreignKey: 'sellerId',
  as: 'seller'
});

module.exports = {
  User,
  Food
};