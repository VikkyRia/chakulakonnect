require('dotenv').config();
const { sequelize, testConnection } = require('./src/config/database');
const User = require('./src/models/user');

const testDatabase = async () => {
  try {
    console.log('Testing database connection...\n');
    
    // Test connection
    await testConnection();
    
    console.log('\n Syncing User model with database...');
    
    // Create users table if it doesn't exist
    await User.sync({ force: false }); // force: false means don't drop existing table
    
    console.log('User table synced successfully!');
    console.log('Database setup complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error.message);
    process.exit(1);
  }
};

testDatabase();