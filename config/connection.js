// Import the 'dotenv' module to load environment variables from a '.env' file
require('dotenv').config();

// Import the Sequelize library for database connections
const Sequelize = require('sequelize');

// Create a Sequelize instance by checking if a JAWSDB_URL environment variable is available
// If JAWSDB_URL is defined, use it to connect to a remote database (e.g., for deployment)
// If not, use the local environment variables (DB_NAME, DB_USER, DB_PASSWORD) to connect to a local MySQL database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',        // Specify the database host (localhost in this case)
      dialect: 'mysql',         // Specify the database dialect (MySQL in this case)
      dialectOptions: {
        decimalNumbers: true,   // Enable support for decimal numbers in the database
      },
    });

// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;