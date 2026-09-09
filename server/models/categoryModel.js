const pool = require("../config/db");


// ============================================
// GET ALL CATEGORIES
// ============================================

const getCategories = async () => {
    const query = `
        SELECT
            id,
            name,
            created_at
        FROM categories
        ORDER BY name ASC
    `;

    const result = await pool.query(query);

    return result.rows;
};


// ============================================
// GET SINGLE CATEGORY
// ============================================

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            id,
            name,
            created_at
        FROM categories
        WHERE id = $1
    `;

    const result = await pool.query(query, [
        categoryId,
    ]);

    return result.rows[0];
};


// ============================================
// CREATE CATEGORY
// ============================================

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING id, name, created_at
    `;

    const result = await pool.query(query, [
        name,
    ]);

    return result.rows[0];
};


// ============================================
// UPDATE CATEGORY
// ============================================

const updateCategory = async (
    categoryId,
    name
) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING id, name, created_at
    `;

    const result = await pool.query(query, [
        name,
        categoryId,
    ]);

    return result.rows[0];
};


// ============================================
// DELETE CATEGORY
// ============================================

const deleteCategory = async (categoryId) => {
    const query = `
        DELETE FROM categories
        WHERE id = $1
        RETURNING id
    `;

    const result = await pool.query(query, [
        categoryId,
    ]);

    return result.rows[0];
};


// ============================================
// EXPORT
// ============================================

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};