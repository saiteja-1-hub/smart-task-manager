const {
    getTasks,
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
// GET /api/tasks
// ============================================

const getAllTasks = async (
    req,
    res,
    next
) => {
    try {
        const tasks = await getTasks();

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
// GET /api/tasks/:id
// ============================================

const getTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await getTaskById(
            req.params.id
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
// POST /api/tasks
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

        if (
            !title ||
            !String(title).trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Task title is required",
            });
        }

        const taskPriority =
            priority || "MEDIUM";

        const taskStatus =
            status || "TODO";

        if (
            !isValidPriority(taskPriority)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority",
            });
        }

        if (
            !isValidStatus(taskStatus)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const task = await createTask(
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
// UPDATE TASK
// PUT /api/tasks/:id
// ============================================

const editTask = async (
    req,
    res,
    next
) => {
    try {
        const existingTask =
            await getTaskById(
                req.params.id
            );

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const {
            category_id,
            title,
            description,
            priority,
            status,
            due_date,
        } = req.body;

        const finalTitle =
            title !== undefined
                ? String(title).trim()
                : existingTask.title;

        const finalDescription =
            description !== undefined
                ? description
                : existingTask.description;

        const finalPriority =
            priority ||
            existingTask.priority;

        const finalStatus =
            status ||
            existingTask.status;

        const finalCategory =
            category_id !== undefined
                ? category_id
                : existingTask.category_id;

        const finalDueDate =
            due_date !== undefined
                ? due_date
                : existingTask.due_date;

        if (!finalTitle) {
            return res.status(400).json({
                success: false,
                message: "Task title is required",
            });
        }

        if (
            !isValidPriority(
                finalPriority
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority",
            });
        }

        if (
            !isValidStatus(
                finalStatus
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const task = await updateTask(
            req.params.id,
            finalCategory,
            finalTitle,
            finalDescription,
            finalPriority,
            finalStatus,
            finalDueDate
        );

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
// DELETE /api/tasks/:id
// ============================================

const removeTask = async (
    req,
    res,
    next
) => {
    try {
        const task =
            await deleteTask(
                req.params.id
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
// PATCH /api/tasks/:id/status
// ============================================

const changeTaskStatus = async (id, status) => {
    try {
        setError(null);

        const data =
            await taskService.updateTaskStatus(
                id,
                status
            );

        const updatedTask =
            data?.task || data;

        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                const taskId =
                    task.id ??
                    task._id ??
                    task.task_id;

                return String(taskId) === String(id)
                    ? {
                          ...task,
                          ...updatedTask,
                          status,
                      }
                    : task;
            })
        );

        return data;
    } catch (err) {
        console.error(
            "Failed to change task status:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Failed to change task status"
        );

        throw err;
    }
};

// ============================================
// EXPORT
// ============================================

module.exports = {
    getTasks: getAllTasks,
    getTask,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
};