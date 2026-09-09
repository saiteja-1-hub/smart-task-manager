import api from "./api";

// ============================================
// GET ALL TASKS
// ============================================

const getTasks = async () => {
    const response = await api.get("/tasks");

    return response.data;
};


// ============================================
// GET SINGLE TASK
// ============================================

const getTask = async (id) => {
    const response = await api.get(
        `/tasks/${id}`
    );

    return response.data;
};


// ============================================
// CREATE TASK
// ============================================

const createTask = async (taskData) => {
    const response = await api.post(
        "/tasks",
        taskData
    );

    return response.data;
};


// ============================================
// UPDATE TASK
// ============================================

const updateTask = async (
    id,
    taskData
) => {
    const response = await api.put(
        `/tasks/${id}`,
        taskData
    );

    return response.data;
};


// ============================================
// UPDATE TASK STATUS
// ============================================

const updateTaskStatus = async (
    id,
    status
) => {
    const response = await api.patch(
        `/tasks/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};


// ============================================
// DELETE TASK
// ============================================

const deleteTask = async (id) => {
    const response = await api.delete(
        `/tasks/${id}`
    );

    return response.data;
};


// ============================================
// EXPORT
// ============================================

const taskService = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
};

export default taskService;