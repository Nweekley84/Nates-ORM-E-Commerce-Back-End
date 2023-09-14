// Import necessary modules from Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize connection from the 'connection.js' file
const sequelize = require('../config/connection.js');

// Define the Category class that extends Sequelize's Model class
class Category extends Model {}

// Initialize the Category model with its attributes (columns)
Category.init(
  {
    // Define columns here
  },
  {
    sequelize,            // Pass the configured Sequelize connection
    timestamps: false,    // Disable timestamps for this model (createdAt and updatedAt)
    freezeTableName: true, // Prevent pluralizing table names
    underscored: true,    // Use underscores instead of camelCase for column names
    modelName: 'category' // Set the model name to 'category'
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;