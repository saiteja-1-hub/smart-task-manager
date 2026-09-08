const {
    getCategoriesByUser,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../models/categoryModel");

const getCategories = async (
    req,
    res,
    next
) => {
    try {
        const categories =
            await getCategoriesByUser(
                req.user.id
            );

        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

const getCategory = async (
    req,
    res,
    next
) => {
    try {
        const category =
            await getCategoryById(
                req.params.id,
                req.user.id
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
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

const addCategory = async (
    req,
    res,
    next
) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const category =
            await createCategory(
                req.user.id,
                name.trim()
            );

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

const editCategory = async (
    req,
    res,
    next
) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const category =
            await updateCategory(
                req.params.id,
                req.user.id,
                name.trim()
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

const removeCategory = async (
    req,
    res,
    next
) => {
    try {
        const category =
            await deleteCategory(
                req.params.id,
                req.user.id
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
};