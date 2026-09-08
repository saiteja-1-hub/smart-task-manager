 
const {
    getTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} = require("../models/taskModel");

const {
    isValidPriority,
    isValidStatus,
} = require("../utils/validators");


// ============================================
// GET ALL TASKS
// GET /tasks
// ============================================

const getTasks = async (
    req,
    res,
    next
) => {
    try {
        const tasks = await getTasksByUser(
            req.user.id
        );

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// GET SINGLE TASK
// GET /tasks/:id
// ============================================

const getTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await getTaskById(
            req.params.id,
            req.user.id
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// CREATE TASK
// POST /tasks
// ============================================

const addTask = async (
    req,
    res,
    next
) => {
    try {
        const {
            category_id,
            title,
            description,
            priority,
            status,
            due_date,
        } = req.body;


        // Validate title
        if (
            !title ||
            !String(title).trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Task title is required",
            });
        }


        // Default values
        const taskPriority =
            priority || "MEDIUM";

        const taskStatus =
            status || "TODO";


        // Validate priority
        if (
            !isValidPriority(
                taskPriority
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority",
            });
        }


        // Validate status
        if (
            !isValidStatus(
                taskStatus
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }


        // Create task
        const task = await createTask(
            req.user.id,
            category_id,
            String(title).trim(),
            description,
            taskPriority,
            taskStatus,
            due_date
        );


        res.status(201).json({
            success: true,
            message:
                "Task created successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// UPDATE COMPLETE TASK
// PUT /tasks/:id
// ============================================

const editTask = async (
    req,
    res,
    next
) => {
    try {
        const {
            category_id,
            title,
            description,
            priority,
            status,
            due_date,
        } = req.body;


        // Validate title
        if (
            !title ||
            !String(title).trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Task title is required",
            });
        }


        // Validate priority
        if (
            !isValidPriority(priority)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority",
            });
        }


        // Validate status
        if (
            !isValidStatus(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }


        // Update task
        const task = await updateTask(
            req.params.id,
            req.user.id,
            category_id,
            String(title).trim(),
            description,
            priority,
            status,
            due_date
        );


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }


        res.status(200).json({
            success: true,
            message:
                "Task updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// DELETE TASK
// DELETE /tasks/:id
// ============================================

const removeTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await deleteTask(
            req.params.id,
            req.user.id
        );


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }


        res.status(200).json({
            success: true,
            message:
                "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// CHANGE TASK STATUS
// PATCH /tasks/:id/status
// ============================================

const changeTaskStatus = async (
    req,
    res,
    next
) => {
    try {
        const { status } = req.body;


        // Validate status
        if (
            !isValidStatus(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }


        // Update only status
        const task =
            await updateTaskStatus(
                req.params.id,
                req.user.id,
                status
            );


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }


        res.status(200).json({
            success: true,
            message:
                "Task status updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================
// EXPORT CONTROLLERS
// ============================================

module.exports = {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
};
 
