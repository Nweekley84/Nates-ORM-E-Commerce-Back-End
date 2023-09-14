const router = require("express").Router(); // Initialize Express Router
const { Tag, Product } = require("../../models"); // Import necessary models

// Route to get all tags with associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData); // Send JSON response with tags data
  } catch (err) {
    res.status(500).json({ message: "Tags not found!" }); // Handle error if tags are not found
  }
});

// Route to get a specific tag by its ID with associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" }); // Handle case where tag is not found
      return;
    }
    res.status(200).json(tagData); // Send JSON response with tag data
  } catch (err) {
    res.status(500).json({ message: "Tag not found!" }); // Handle error if tag is not found
  }
});

// Route to create a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body); // Create a new tag using data from request body
    res.status(200).json(tagData); // Send JSON response with newly created tag
  } catch (err) {
    res.status(400).json({ message: "Tag creation failed" }); // Handle error if creation fails
  }
});

// Route to update an existing tag
router.put("/:id", async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "No tag found with this id!" }) // Handle case where tag ID is not found
      : res.status(200).json(updated); // Send JSON response with updated tag data
  } catch (err) {
    res.status(500).json({ message: "Tag update failed" }); // Handle error if update fails
  }
});

// Route to delete a tag by its ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } }); // Delete tag
    !deleted
      ? res.status(404).json({ message: "No tag found with this id!" }) // Handle case where tag ID is not found
      : res.status(200).json(deleted); // Send JSON response with number of deleted rows
  } catch (err) {
    res.status(500).json({ message: "Tag deletion failed" }); // Handle error if deletion fails
  }
});

module.exports = router; // Export the router for use in other parts of the application
