// Import necessary modules from Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize connection from the 'connection.js' file
const sequelize = require('../config/connection.js');

// Define the Tag class that extends Sequelize's Model class
class Tag extends Model {}

// Initialize the Tag model with its attributes (columns)
Tag.init(
  {
    // Define columns here
  },
  {
    sequelize,            // Pass the configured Sequelize connection
    timestamps: false,    // Disable timestamps for this model (createdAt and updatedAt)
    freezeTableName: true, // Prevent pluralizing table names
    underscored: true,    // Use underscores instead of camelCase for column names
    modelName: 'tag'      // Set the model name to 'tag'
  }
);

// Export the Tag model for use in other parts of the application
module.exports = Tag;