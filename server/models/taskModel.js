const pool = require("../config/db");

// ============================================
// GET ALL TASKS
// ============================================

const getTasks = async () => {
    const query = `
        SELECT
            t.id,
            t.category_id,
            t.title,
            t.description,
            t.priority,
            t.status,
            t.due_date,
            t.created_at,
            t.updated_at,
            c.name AS category_name
        FROM tasks t
        LEFT JOIN categories c
            ON t.category_id = c.id
        ORDER BY
            CASE
                WHEN t.status = 'COMPLETED' THEN 1
                ELSE 0
            END,
            t.due_date ASC NULLS LAST,
            t.created_at DESC
    `;

    const result = await pool.query(query);

    return result.rows;
};


// ============================================
// GET SINGLE TASK
// ============================================

const getTaskById = async (taskId) => {
    const query = `
        SELECT
            t.id,
            t.category_id,
            t.title,
            t.description,
            t.priority,
            t.status,
            t.due_date,
            t.created_at,
            t.updated_at,
            c.name AS category_name
        FROM tasks t
        LEFT JOIN categories c
            ON t.category_id = c.id
        WHERE t.id = $1
    `;

    const result = await pool.query(query, [taskId]);

    return result.rows[0];
};


// ============================================
// CREATE TASK
// ============================================

const createTask = async (
    categoryId,
    title,
    description,
    priority,
    status,
    dueDate
) => {
    const query = `
        INSERT INTO tasks (
            category_id,
            title,
            description,
            priority,
            status,
            due_date
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [
        categoryId || null,
        title,
        description || null,
        priority || "MEDIUM",
        status || "TODO",
        dueDate || null,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// ============================================
// UPDATE TASK
// ============================================

const updateTask = async (
    taskId,
    categoryId,
    title,
    description,
    priority,
    status,
    dueDate
) => {
    const query = `
        UPDATE tasks
        SET
            category_id = $1,
            title = $2,
            description = $3,
            priority = $4,
            status = $5,
            due_date = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
    `;

    const values = [
        categoryId || null,
        title,
        description || null,
        priority,
        status,
        dueDate || null,
        taskId,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// ============================================
// DELETE TASK
// ============================================

const deleteTask = async (taskId) => {
    const query = `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING id
    `;

    const result = await pool.query(query, [taskId]);

    return result.rows[0];
};


// ============================================
// UPDATE TASK STATUS
// ============================================

const updateTaskStatus = async (
    taskId,
    status
) => {
    const query = `
        UPDATE tasks
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
    `;

    const result = await pool.query(query, [
        status,
        taskId,
    ]);

    return result.rows[0];
};


// ============================================
// EXPORT
// ============================================

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
};