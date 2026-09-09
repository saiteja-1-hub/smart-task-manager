const express = require("express");

const {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
} = require("../controllers/categoryController");

const router = express.Router();


// GET all categories
router.get("/", getCategories);

// GET single category
router.get("/:id", getCategory);

// CREATE category
router.post("/", addCategory);

// UPDATE category
router.put("/:id", editCategory);

// DELETE category
router.delete("/:id", removeCategory);

module.exports = router;