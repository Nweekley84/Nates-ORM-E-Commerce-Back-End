// Import the Express router and individual route files
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the imported route files to handle specific routes
router.use('/categories', categoryRoutes); // Routes for categories
router.use('/products', productRoutes);   // Routes for products
router.use('/tags', tagRoutes);           // Routes for tags

// Export the router for use in other parts of the application
module.exports = router;
