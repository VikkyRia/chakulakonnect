const { Sequelize } = require('sequelize');
require('dotenv').config();

// Determine if SSL is needed (for cloud databases like Neon)
const isProduction = process.env.NODE_ENV === 'production';

// Create database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: isProduction ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully!');
  } catch (error) {
    console.error('Unable to connect to database:', error.message);
  }
};

module.exports = { sequelize, testConnection };