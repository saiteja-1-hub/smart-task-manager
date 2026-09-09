const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../models/categoryModel");


// ============================================
// GET ALL CATEGORIES
// GET /api/categories
// ============================================

const getAllCategories = async (
    req,
    res,
    next
) => {
    try {
        const categories =
            await getCategories();

        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// GET SINGLE CATEGORY
// GET /api/categories/:id
// ============================================

const getCategory = async (
    req,
    res,
    next
) => {
    try {
        const category =
            await getCategoryById(
                req.params.id
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message:
                    "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// CREATE CATEGORY
// POST /api/categories
// ============================================

const addCategory = async (
    req,
    res,
    next
) => {
    try {
        const { name } = req.body;

        if (
            !name ||
            !String(name).trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Category name is required",
            });
        }

        const category =
            await createCategory(
                String(name).trim()
            );

        res.status(201).json({
            success: true,
            message:
                "Category created successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// UPDATE CATEGORY
// PUT /api/categories/:id
// ============================================

const editCategory = async (
    req,
    res,
    next
) => {
    try {
        const { name } = req.body;

        if (
            !name ||
            !String(name).trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Category name is required",
            });
        }

        const category =
            await updateCategory(
                req.params.id,
                String(name).trim()
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message:
                    "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Category updated successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// DELETE CATEGORY
// DELETE /api/categories/:id
// ============================================

const removeCategory = async (
    req,
    res,
    next
) => {
    try {
        const category =
            await deleteCategory(
                req.params.id
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message:
                    "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Category deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// EXPORT
// ============================================

module.exports = {
    getCategories: getAllCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
};