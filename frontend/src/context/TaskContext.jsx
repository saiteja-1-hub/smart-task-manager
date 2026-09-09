import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import taskService from "../services/taskService";
import categoryService from "../services/categoryService";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // =========================
    // FETCH TASKS
    // =========================
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await taskService.getTasks();

            setTasks(
                Array.isArray(data)
                    ? data
                    : data?.tasks || []
            );
        } catch (err) {
            console.error("Failed to fetch tasks:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch tasks"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // FETCH CATEGORIES
    // =========================
    const fetchCategories = async () => {
        try {
            const data = await categoryService.getCategories();

            setCategories(
                Array.isArray(data)
                    ? data
                    : data?.categories || []
            );
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    // =========================
    // CREATE TASK
    // =========================
    const createTask = async (taskData) => {
        try {
            setError(null);

            const data = await taskService.createTask(taskData);

            const newTask = data?.task || data;

            if (newTask) {
                setTasks((prevTasks) => [
                    newTask,
                    ...prevTasks,
                ]);
            }

            return data;
        } catch (err) {
            console.error("Failed to create task:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to create task"
            );

            throw err;
        }
    };

    // =========================
    // UPDATE TASK
    // =========================
    const updateTask = async (id, taskData) => {
        try {
            setError(null);

            const data = await taskService.updateTask(
                id,
                taskData
            );

            const updatedTask = data?.task || data;

            if (updatedTask) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => {
                        const taskId =
                            task.id ??
                            task._id ??
                            task.task_id;

                        if (String(taskId) === String(id)) {
                            return {
                                ...task,
                                ...updatedTask,
                            };
                        }

                        return task;
                    })
                );
            }

            return data;
        } catch (err) {
            console.error("Failed to update task:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to update task"
            );

            throw err;
        }
    };

    // =========================
    // CHANGE TASK STATUS
    // =========================
    const changeTaskStatus = async (id, status) => {
        try {
            setError(null);

            const data = await taskService.updateTask(
                id,
                {
                    status,
                }
            );

            const updatedTask = data?.task || data;

            setTasks((prevTasks) =>
                prevTasks.map((task) => {
                    const taskId =
                        task.id ??
                        task._id ??
                        task.task_id;

                    if (String(taskId) === String(id)) {
                        return {
                            ...task,
                            ...updatedTask,
                            status,
                        };
                    }

                    return task;
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

    // =========================
    // TOGGLE TASK
    // =========================
    const toggleTask = async (task) => {
        const id =
            task?.id ??
            task?._id ??
            task?.task_id;

        if (!id) {
            throw new Error("Task ID is missing.");
        }

        const currentStatus = String(
            task?.status ||
            (task?.completed
                ? "COMPLETED"
                : "TODO")
        )
            .toUpperCase()
            .replace(/-/g, "_");

        const newStatus =
            currentStatus === "COMPLETED"
                ? "TODO"
                : "COMPLETED";

        return changeTaskStatus(
            id,
            newStatus
        );
    };

    // =========================
    // DELETE TASK
    // =========================
    const removeTask = async (id) => {
        try {
            setError(null);

            const data =
                await taskService.deleteTask(id);

            setTasks((prevTasks) =>
                prevTasks.filter((task) => {
                    const taskId =
                        task.id ??
                        task._id ??
                        task.task_id;

                    return (
                        String(taskId) !==
                        String(id)
                    );
                })
            );

            return data;
        } catch (err) {
            console.error(
                "Failed to delete task:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to delete task"
            );

            throw err;
        }
    };

    // =========================
    // CREATE CATEGORY
    // =========================
    const createCategory = async (
        categoryData
    ) => {
        try {
            const data =
                await categoryService.createCategory(
                    categoryData
                );

            await fetchCategories();

            return data;
        } catch (err) {
            console.error(
                "Failed to create category:",
                err
            );

            throw err;
        }
    };

    // =========================
    // UPDATE CATEGORY
    // =========================
    const updateCategory = async (
        id,
        categoryData
    ) => {
        try {
            const data =
                await categoryService.updateCategory(
                    id,
                    categoryData
                );

            await fetchCategories();

            return data;
        } catch (err) {
            console.error(
                "Failed to update category:",
                err
            );

            throw err;
        }
    };

    // =========================
    // DELETE CATEGORY
    // =========================
    const deleteCategory = async (id) => {
        try {
            const data =
                await categoryService.deleteCategory(
                    id
                );

            setCategories((prevCategories) =>
                prevCategories.filter(
                    (category) => {
                        const categoryId =
                            category.id ??
                            category._id ??
                            category.category_id;

                        return (
                            String(categoryId) !==
                            String(id)
                        );
                    }
                )
            );

            return data;
        } catch (err) {
            console.error(
                "Failed to delete category:",
                err
            );

            throw err;
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        fetchTasks();
        fetchCategories();
    }, []);

    // =========================
    // CONTEXT VALUE
    // =========================
    return (
        <TaskContext.Provider
            value={{
                // Data
                tasks,
                categories,

                // State
                loading,
                error,

                // Tasks
                fetchTasks,
                createTask,
                updateTask,
                removeTask,
                toggleTask,
                changeTaskStatus,

                // Categories
                createCategory,
                updateCategory,
                deleteCategory,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// =========================
// CUSTOM HOOK
// =========================
export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error(
            "useTasks must be used inside TaskProvider"
        );
    }

    return context;
};

export default TaskContext;