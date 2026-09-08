const pool = require("../config/db");

const getTasksByUser = async (userId) => {
    const query = `
        SELECT
            t.id,
            t.user_id,
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
        WHERE t.user_id = $1
        ORDER BY
            CASE
                WHEN t.status = 'COMPLETED' THEN 1
                ELSE 0
            END,
            t.due_date ASC NULLS LAST,
            t.created_at DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
};

const getTaskById = async (taskId, userId) => {
    const query = `
        SELECT
            t.id,
            t.user_id,
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
        WHERE t.id = $1 AND t.user_id = $2
    `;

    const result = await pool.query(query, [
        taskId,
        userId,
    ]);

    return result.rows[0];
};

const createTask = async (
    userId,
    categoryId,
    title,
    description,
    priority,
    status,
    dueDate
) => {
    const query = `
        INSERT INTO tasks (
            user_id,
            category_id,
            title,
            description,
            priority,
            status,
            due_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;

    const values = [
        userId,
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

const updateTask = async (
    taskId,
    userId,
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
        WHERE id = $7 AND user_id = $8
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
        userId,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const deleteTask = async (taskId, userId) => {
    const query = `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING id
    `;

    const result = await pool.query(query, [
        taskId,
        userId,
    ]);

    return result.rows[0];
};

const updateTaskStatus = async (
    taskId,
    userId,
    status
) => {
    const query = `
        UPDATE tasks
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 AND user_id = $3
        RETURNING *
    `;

    const result = await pool.query(query, [
        status,
        taskId,
        userId,
    ]);

    return result.rows[0];
};

module.exports = {
    getTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
};