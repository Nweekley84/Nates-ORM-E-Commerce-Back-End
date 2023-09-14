// Import the Express router and necessary models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Route to get all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get a specific category by ID and its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Category creation failed' });
  }
});

// Route to update an existing category by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    !updated[0] ? res.status(404).json({ message: 'Category not found' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Category update failed' });
  }
});

// Route to delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    !deleted ? res.status(404).json({ message: 'Category not found' }) : res.status(200).json(deleted);
  }
  catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
