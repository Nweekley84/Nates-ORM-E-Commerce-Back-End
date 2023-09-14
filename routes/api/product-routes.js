const router = require("express").Router(); // Initialize Express Router
const { Product, Category, Tag, ProductTag } = require("../../models"); // Import necessary models

// Route to get all products with associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products); // Send JSON response with products data
  } catch (err) {
    res.status(500).json({ message: "Products not found!" }); // Handle error if products are not found
  }
});

// Route to get a specific product by its ID with associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !product
      ? res.status(404).json({ message: "Product not found!" }) // Handle case where product is not found
      : res.status(200).json(product); // Send JSON response with product data
  } catch (err) {
    res.status(500).json({ message: "Product not found!" }); // Handle error if product is not found
  }
});

// Route to create a new product
router.post("/", (req, res) => {
  Product.create(req.body) // Create a new product using data from request body
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIds = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIds); // Create new ProductTag associations
      }
      res.status(200).json(product); // Send JSON response with newly created product
    })
    .then((productTagIds) => res.status(200).json(productTagIds)) // Send JSON response with productTagIds
    .catch((err) => {
      res.status(400).json({ message: "Creation failed", error: err }); // Handle error if creation fails
    });
});

// Route to update an existing product
router.put("/:id", async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } }); // Update product data

    // Handle updating product tags
    if (req.body.tags && req.body.tags.length > 0) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tags
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }), // Remove old associations
        ProductTag.bulkCreate(newProductTags), // Create new associations
      ]);
    }

    const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
    return res.json(product); // Send JSON response with updated product data
  } catch (error) {
    console.log(error);
    return res.status(500).json(error); // Handle error if update fails
  }
});

// Route to delete a product by its ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } }); // Delete product
    !deleted
      ? res.status(404).json({ message: "id not found" }) // Handle case where product ID is not found
      : res.status(200).json(deleted); // Send JSON response with number of deleted rows
  } catch (err) {
    res.status(500).json({ message: "Product not deleted!", error: err }); // Handle error if deletion fails
  }
});

module.exports = router; // Export the router for use in other parts of the application
