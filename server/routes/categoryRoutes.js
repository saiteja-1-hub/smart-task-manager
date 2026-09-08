const express = require("express");

const {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
} = require("../controllers/categoryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", addCategory);

router.put("/:id", editCategory);

router.delete("/:id", removeCategory);

module.exports = router;