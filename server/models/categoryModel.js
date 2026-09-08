const pool = require("../config/db");

const getCategoriesByUser = async (userId) => {
    const query = `
        SELECT id, user_id, name, created_at
        FROM categories
        WHERE user_id = $1
        ORDER BY name ASC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
};

const getCategoryById = async (categoryId, userId) => {
    const query = `
        SELECT id, user_id, name, created_at
        FROM categories
        WHERE id = $1 AND user_id = $2
    `;

    const result = await pool.query(query, [categoryId, userId]);

    return result.rows[0];
};

const createCategory = async (userId, name) => {
    const query = `
        INSERT INTO categories (user_id, name)
        VALUES ($1, $2)
        RETURNING id, user_id, name, created_at
    `;

    const result = await pool.query(query, [userId, name]);

    return result.rows[0];
};

const updateCategory = async (categoryId, userId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE id = $2 AND user_id = $3
        RETURNING id, user_id, name, created_at
    `;

    const result = await pool.query(query, [
        name,
        categoryId,
        userId,
    ]);

    return result.rows[0];
};

const deleteCategory = async (categoryId, userId) => {
    const query = `
        DELETE FROM categories
        WHERE id = $1 AND user_id = $2
        RETURNING id
    `;

    const result = await pool.query(query, [
        categoryId,
        userId,
    ]);

    return result.rows[0];
};

module.exports = {
    getCategoriesByUser,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};