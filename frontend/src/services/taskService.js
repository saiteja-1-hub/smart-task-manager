 
import api from "./api";


// ============================================
// GET ALL TASKS
// ============================================

const getTasks = async () => {
    const response = await api.get("/tasks");

    if (Array.isArray(response.data)) {
        return response.data;
    }

    return (
        response.data?.tasks ||
        response.data?.data ||
        []
    );
};


// ============================================
// CREATE TASK
// ============================================

const createTask = async (taskData) => {
    const response = await api.post(
        "/tasks",
        taskData
    );

    return (
        response.data?.task ||
        response.data?.data ||
        response.data
    );
};


// ============================================
// UPDATE COMPLETE TASK
// ============================================

const updateTask = async (
    id,
    taskData
) => {
    const response = await api.put(
        `/tasks/${id}`,
        taskData
    );

    return (
        response.data?.task ||
        response.data?.data ||
        response.data
    );
};


// ============================================
// CHANGE TASK STATUS
// ============================================

const changeTaskStatus = async (
    id,
    status
) => {
    const response = await api.patch(
        `/tasks/${id}/status`,
        {
            status,
        }
    );

    return (
        response.data?.task ||
        response.data?.data ||
        response.data
    );
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
    createTask,
    updateTask,
    changeTaskStatus,
    deleteTask,
};

export default taskService;
 
