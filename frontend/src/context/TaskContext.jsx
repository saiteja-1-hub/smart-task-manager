 
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import taskService from "../services/taskService";
import categoryService from "../services/categoryService";

import { useAuth } from "./AuthContext";


const TaskContext = createContext();


// ============================================
// TASK PROVIDER
// ============================================

const TaskProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();


    // ========================================
    // STATE
    // ========================================

    const [tasks, setTasks] = useState([]);

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ========================================
    // FETCH TASKS
    // ========================================

    const fetchTasks = useCallback(
        async () => {
            try {
                setError("");

                const response =
                    await taskService.getTasks();

                console.log(
                    "Tasks received from API:",
                    response
                );

                let taskList = [];

                if (Array.isArray(response)) {
                    taskList = response;
                } else if (
                    Array.isArray(
                        response?.tasks
                    )
                ) {
                    taskList =
                        response.tasks;
                } else if (
                    Array.isArray(
                        response?.data
                    )
                ) {
                    taskList =
                        response.data;
                } else if (
                    Array.isArray(
                        response?.data
                            ?.tasks
                    )
                ) {
                    taskList =
                        response.data.tasks;
                }

                console.log(
                    "Tasks stored in state:",
                    taskList
                );

                setTasks(taskList);
            } catch (err) {
                console.error(
                    "Failed to fetch tasks:",
                    err
                );

                setTasks([]);

                setError(
                    err?.response
                        ?.data?.message ||
                    err?.response
                        ?.data?.error ||
                    err?.message ||
                    "Failed to load tasks."
                );
            }
        },
        []
    );


    // ========================================
    // FETCH CATEGORIES
    // ========================================

    const fetchCategories =
        useCallback(
            async () => {
                try {
                    const response =
                        await categoryService.getCategories();

                    console.log(
                        "Categories received from API:",
                        response
                    );

                    let categoryList =
                        [];

                    if (
                        Array.isArray(
                            response
                        )
                    ) {
                        categoryList =
                            response;
                    } else if (
                        Array.isArray(
                            response?.categories
                        )
                    ) {
                        categoryList =
                            response.categories;
                    } else if (
                        Array.isArray(
                            response?.data
                        )
                    ) {
                        categoryList =
                            response.data;
                    } else if (
                        Array.isArray(
                            response?.data
                                ?.categories
                        )
                    ) {
                        categoryList =
                            response.data
                                .categories;
                    }

                    setCategories(
                        categoryList
                    );
                } catch (err) {
                    console.error(
                        "Failed to fetch categories:",
                        err
                    );

                    setCategories([]);

                    console.warn(
                        "Categories could not be loaded."
                    );
                }
            },
            []
        );


    // ========================================
    // REFRESH ALL DATA
    // ========================================

    const refreshData =
        useCallback(
            async () => {
                if (
                    !isAuthenticated
                ) {
                    return;
                }

                setLoading(true);
                setError("");

                try {
                    await Promise.all([
                        fetchTasks(),
                        fetchCategories(),
                    ]);
                } catch (err) {
                    console.error(
                        "Failed to refresh dashboard:",
                        err
                    );
                } finally {
                    setLoading(false);
                }
            },
            [
                isAuthenticated,
                fetchTasks,
                fetchCategories,
            ]
        );


    // ========================================
    // LOAD DATA WHEN AUTHENTICATED
    // ========================================

    useEffect(() => {
        if (isAuthenticated) {
            refreshData();
        } else {
            setTasks([]);
            setCategories([]);
            setError("");
        }
    }, [
        isAuthenticated,
        refreshData,
    ]);


    // ========================================
    // CREATE TASK
    // ========================================

    const createTask = async (
        taskData
    ) => {
        try {
            setError("");

            console.log(
                "Creating task:",
                taskData
            );

            const createdTask =
                await taskService.createTask(
                    taskData
                );

            console.log(
                "Created task:",
                createdTask
            );

            await fetchTasks();

            return createdTask;
        } catch (err) {
            console.error(
                "Failed to create task:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to create task."
            );

            throw err;
        }
    };


    // ========================================
    // UPDATE COMPLETE TASK
    // ========================================

    const updateTask = async (
        id,
        taskData
    ) => {
        try {
            setError("");

            console.log(
                "Updating task:",
                id,
                taskData
            );

            const updatedTask =
                await taskService.updateTask(
                    id,
                    taskData
                );

            await fetchTasks();

            return updatedTask;
        } catch (err) {
            console.error(
                "Failed to update task:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to update task."
            );

            throw err;
        }
    };


    // ========================================
    // CHANGE TASK STATUS
    //
    // Used by:
    // - Checkbox
    // - Start Task button
    //
    // PATCH /tasks/:id/status
    // ========================================

    const changeTaskStatus = async (
        id,
        status
    ) => {
        try {
            setError("");

            if (!id) {
                throw new Error(
                    "Task ID is missing."
                );
            }

            console.log(
                "Changing task status:",
                {
                    id,
                    status,
                }
            );

            const updatedTask =
                await taskService.changeTaskStatus(
                    id,
                    status
                );

            console.log(
                "Task status updated:",
                updatedTask
            );

            // Refresh task list
            await fetchTasks();

            return updatedTask;
        } catch (err) {
            console.error(
                "Failed to change task status:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to update task."
            );

            throw err;
        }
    };


    // ========================================
    // TOGGLE TASK
    //
    // Checkbox:
    // TODO → COMPLETED
    // COMPLETED → TODO
    // ========================================

    const toggleTask = async (
        task
    ) => {
        try {
            setError("");

            const id =
                task?.id ??
                task?._id ??
                task?.task_id;

            if (!id) {
                throw new Error(
                    "Task ID is missing."
                );
            }

            const currentStatus =
                String(
                    task?.status || ""
                )
                    .toUpperCase()
                    .replace(
                        /-/g,
                        "_"
                    );

            let newStatus;

            if (
                currentStatus ===
                    "COMPLETED" ||
                currentStatus ===
                    "DONE"
            ) {
                newStatus = "TODO";
            } else {
                newStatus =
                    "COMPLETED";
            }

            console.log(
                "Toggling task:",
                {
                    id,
                    currentStatus,
                    newStatus,
                }
            );

            await changeTaskStatus(
                id,
                newStatus
            );
        } catch (err) {
            console.error(
                "Failed to toggle task:",
                err
            );

            throw err;
        }
    };


    // ========================================
    // DELETE TASK
    // ========================================

    const removeTask = async (
        id
    ) => {
        try {
            setError("");

            console.log(
                "Deleting task:",
                id
            );

            await taskService.deleteTask(
                id
            );

            await fetchTasks();
        } catch (err) {
            console.error(
                "Failed to delete task:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to delete task."
            );

            throw err;
        }
    };


    // ========================================
    // CREATE CATEGORY
    // ========================================

    const createCategory = async (
        categoryData
    ) => {
        try {
            setError("");

            const category =
                await categoryService.createCategory(
                    categoryData
                );

            await fetchCategories();

            return category;
        } catch (err) {
            console.error(
                "Failed to create category:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to create category."
            );

            throw err;
        }
    };


    // ========================================
    // UPDATE CATEGORY
    // ========================================

    const updateCategory = async (
        id,
        categoryData
    ) => {
        try {
            setError("");

            const category =
                await categoryService.updateCategory(
                    id,
                    categoryData
                );

            await fetchCategories();

            return category;
        } catch (err) {
            console.error(
                "Failed to update category:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to update category."
            );

            throw err;
        }
    };


    // ========================================
    // DELETE CATEGORY
    // ========================================

    const deleteCategory = async (
        id
    ) => {
        try {
            setError("");

            await categoryService.deleteCategory(
                id
            );

            await fetchCategories();

            await fetchTasks();
        } catch (err) {
            console.error(
                "Failed to delete category:",
                err
            );

            setError(
                err?.response
                    ?.data?.message ||
                err?.response
                    ?.data?.error ||
                err?.message ||
                "Failed to delete category."
            );

            throw err;
        }
    };


    // ========================================
    // PROVIDER
    // ========================================

    return (
        <TaskContext.Provider
            value={{
                tasks,
                categories,

                loading,
                error,

                fetchTasks,
                fetchCategories,
                refreshData,

                createTask,
                updateTask,

                changeTaskStatus,
                toggleTask,

                removeTask,

                createCategory,
                updateCategory,
                deleteCategory,

                setError,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};


// ============================================
// HOOK
// ============================================

export const useTasks = () => {
    return useContext(
        TaskContext
    );
};


export {
    TaskProvider,
};


export default TaskContext;
 
