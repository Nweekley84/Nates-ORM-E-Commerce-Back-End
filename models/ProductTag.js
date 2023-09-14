// Import necessary modules from Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize connection from the 'connection.js' file
const sequelize = require('../config/connection');

// Define the ProductTag class that extends Sequelize's Model class
class ProductTag extends Model {}

// Initialize the ProductTag model with its attributes (columns)
ProductTag.init(
  {
    // Define columns here
  },
  {
    sequelize,            // Pass the configured Sequelize connection
    timestamps: false,    // Disable timestamps for this model (createdAt and updatedAt)
    freezeTableName: true, // Prevent pluralizing table names
    underscored: true,    // Use underscores instead of camelCase for column names
    modelName: 'product_tag' // Set the model name to 'product_tag'
  }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;