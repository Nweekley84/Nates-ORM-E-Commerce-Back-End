const router = require('express').Router(); // Initialize Express Router

const apiRoutes = require('./api'); // Import API routes

router.use('/api', apiRoutes); // Mount API routes under '/api' prefix

// Fallback route for any other route not matched
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>"); // Send an HTML response for unmatched routes
});

module.exports = router; // Export the router for use in other parts of the application
