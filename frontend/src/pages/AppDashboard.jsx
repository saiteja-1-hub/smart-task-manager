import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    RefreshCw,
    Tags,
} from "lucide-react";

import Navbar from "../components/Navbar";

import WelcomeSection from "../components/Dashboard/WelcomeSection";
import StatsCards from "../components/Dashboard/StatsCards";
import TaskToolbar from "../components/Dashboard/TaskToolbar";
import TaskList from "../components/Dashboard/TaskList";
import SmartRecommendation from "../components/Dashboard/SmartRecommendation";
import ProductivityInsights from "../components/Dashboard/ProductivityInsights";

import CreateTaskModal from "../components/Modals/CreateTaskModal";
import EditTaskModal from "../components/Modals/EditTaskModal";
import TaskDetailsModal from "../components/Modals/TaskDetailsModal";
import ProfileModal from "../components/Modals/ProfileModal";
import CategoriesModal from "../components/Modals/CategoriesModal";
import ConfirmDeleteModal from "../components/Modals/ConfirmDeleteModal";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { useTasks } from "../context/TaskContext";


const AppDashboard = () => {
    const {
        tasks = [],
        categories = [],
        loading,
        error,
        toggleTask,
        changeTaskStatus,
        removeTask,
        createTask,
        updateTask,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchTasks,
    } = useTasks();


    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy, setSortBy] = useState("smart");

    const [createTaskOpen, setCreateTaskOpen] = useState(false);

    const [editTask, setEditTask] = useState(null);

    const [detailsTask, setDetailsTask] = useState(null);

    const [deleteTask, setDeleteTask] = useState(null);

    const [profileOpen, setProfileOpen] = useState(false);

    const [categoriesOpen, setCategoriesOpen] = useState(false);


    /*
     * Fetch tasks when dashboard loads
     */
    useEffect(() => {
        fetchTasks();
    }, []);


    /*
     * Normalize task status
     *
     * Backend statuses:
     * TODO
     * IN_PROGRESS
     * COMPLETED
     */
    const normalizeTaskStatus = (task) => {
        return String(
            task?.status ||
            (task?.completed
                ? "COMPLETED"
                : "TODO")
        )
            .toLowerCase()
            .replace(/-/g, "_")
            .trim();
    };


    /*
     * Normalize task priority
     */
    const normalizeTaskPriority = (task) => {
        return String(
            task?.priority || "MEDIUM"
        )
            .toLowerCase()
            .trim();
    };


    /*
     * Filter and sort tasks
     */
    const filteredTasks = useMemo(() => {
        let result = tasks.filter((task) => {

            const title = String(
                task?.title || ""
            ).toLowerCase();

            const description = String(
                task?.description || ""
            ).toLowerCase();

            const search = searchTerm
                .toLowerCase()
                .trim();


            /*
             * Search
             */
            const matchesSearch =
                !search ||
                title.includes(search) ||
                description.includes(search);


            /*
             * Status
             */
            const taskStatus =
                normalizeTaskStatus(task);


            /*
             * Priority
             */
            const taskPriority =
                normalizeTaskPriority(task);


            let matchesStatus = true;


            if (statusFilter !== "all") {

                const selectedStatus =
                    String(statusFilter)
                        .toLowerCase()
                        .replace(/-/g, "_")
                        .trim();


                /*
                 * Pending / TODO
                 */
                if (
                    selectedStatus === "pending" ||
                    selectedStatus === "todo"
                ) {
                    matchesStatus =
                        taskStatus === "todo";
                }


                /*
                 * In Progress
                 */
                else if (
                    selectedStatus === "in_progress"
                ) {
                    matchesStatus =
                        taskStatus === "in_progress";
                }


                /*
                 * Completed
                 */
                else if (
                    selectedStatus === "completed"
                ) {
                    matchesStatus =
                        taskStatus === "completed";
                }


                /*
                 * Fallback
                 */
                else {
                    matchesStatus =
                        taskStatus === selectedStatus;
                }
            }


            /*
             * Priority filter
             */
            const matchesPriority =
                priorityFilter === "all" ||
                taskPriority ===
                String(priorityFilter)
                    .toLowerCase();


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );
        });


        /*
         * Copy array before sorting
         */
        result = [...result];


        /*
         * Priority sorting
         */
        if (sortBy === "priority") {

            const priorityOrder = {
                high: 1,
                medium: 2,
                low: 3,
            };


            result.sort((a, b) => {
                return (
                    (priorityOrder[
                        normalizeTaskPriority(a)
                    ] || 4) -
                    (priorityOrder[
                        normalizeTaskPriority(b)
                    ] || 4)
                );
            });
        }


        /*
         * Due date sorting
         */
        if (sortBy === "due_date") {

            result.sort((a, b) => {

                const dateA = a?.due_date
                    ? new Date(
                        a.due_date
                    ).getTime()
                    : Infinity;


                const dateB = b?.due_date
                    ? new Date(
                        b.due_date
                    ).getTime()
                    : Infinity;


                return dateA - dateB;
            });
        }


        /*
         * Newest first
         */
        if (sortBy === "newest") {

            result.sort((a, b) => {

                const dateA =
                    new Date(
                        a?.created_at ||
                        a?.createdAt ||
                        0
                    ).getTime();


                const dateB =
                    new Date(
                        b?.created_at ||
                        b?.createdAt ||
                        0
                    ).getTime();


                return dateB - dateA;
            });
        }


        /*
         * Oldest first
         */
        if (sortBy === "oldest") {

            result.sort((a, b) => {

                const dateA =
                    new Date(
                        a?.created_at ||
                        a?.createdAt ||
                        0
                    ).getTime();


                const dateB =
                    new Date(
                        b?.created_at ||
                        b?.createdAt ||
                        0
                    ).getTime();


                return dateA - dateB;
            });
        }


        return result;

    }, [
        tasks,
        searchTerm,
        statusFilter,
        priorityFilter,
        sortBy,
    ]);


    /*
     * Create task
     */
    const handleCreateTask = async (taskData) => {

        try {

            await createTask(taskData);

            setCreateTaskOpen(false);

            await fetchTasks();

        } catch (err) {

            console.error(
                "Failed to create task:",
                err
            );
        }
    };


    /*
     * Update task
     */
    const handleUpdateTask = async (
        id,
        taskData
    ) => {

        try {

            await updateTask(
                id,
                taskData
            );

            setEditTask(null);

            await fetchTasks();

        } catch (err) {

            console.error(
                "Failed to update task:",
                err
            );
        }
    };


    /*
     * Delete task
     */
    const handleDeleteTask = async () => {

        if (!deleteTask) {
            return;
        }


        try {

            const id =
                deleteTask?.id ??
                deleteTask?._id ??
                deleteTask?.task_id;


            if (!id) {
                throw new Error(
                    "Task ID is missing."
                );
            }


            await removeTask(id);

            setDeleteTask(null);

            await fetchTasks();

        } catch (err) {

            console.error(
                "Failed to delete task:",
                err
            );
        }
    };


    /*
     * Start recommended task
     *
     * TODO
     * ↓
     * IN_PROGRESS
     */
    const handleRecommendationEdit =
        async (task) => {

            try {

                const id =
                    task?.id ??
                    task?._id ??
                    task?.task_id;


                if (!id) {
                    throw new Error(
                        "Task ID is missing."
                    );
                }


                await changeTaskStatus(
                    id,
                    "IN_PROGRESS"
                );

                await fetchTasks();

            } catch (err) {

                console.error(
                    "Failed to start task:",
                    err
                );
            }
        };


    /*
     * View recommended task
     */
    const handleRecommendationView =
        (task) => {

            setDetailsTask(task);
        };


    /*
     * Refresh tasks
     */
    const handleRefresh = async () => {

        try {

            await fetchTasks();

        } catch (err) {

            console.error(
                "Failed to refresh tasks:",
                err
            );
        }
    };


    return (
        <div className="app-dashboard">

            <Navbar
                onProfileClick={() =>
                    setProfileOpen(true)
                }
                onCreateTask={() =>
                    setCreateTaskOpen(true)
                }
            />


            <main className="dashboard-main">

                <div className="dashboard-container">

                    <WelcomeSection
                        onCreateTask={() =>
                            setCreateTaskOpen(true)
                        }
                    />


                    <StatsCards
                        tasks={tasks}
                    />


                    <SmartRecommendation
                        tasks={tasks}
                        onView={
                            handleRecommendationView
                        }
                        onEdit={
                            handleRecommendationEdit
                        }
                    />


                    <ProductivityInsights
                        tasks={tasks}
                    />


                    <div className="task-section">

                        <div className="task-section-header">

                            <div>

                                <h2>
                                    My Tasks
                                </h2>

                                <p>
                                    Manage and organize
                                    your work
                                </p>

                            </div>


                            <div className="task-section-actions">

                                <button
                                    type="button"
                                    className="secondary-action-button"
                                    onClick={
                                        handleRefresh
                                    }
                                >

                                    <RefreshCw
                                        size={16}
                                    />

                                    Refresh

                                </button>


                                <button
                                    type="button"
                                    className="secondary-action-button"
                                    onClick={() =>
                                        setCategoriesOpen(
                                            true
                                        )
                                    }
                                >

                                    <Tags
                                        size={16}
                                    />

                                    Categories

                                </button>


                                <button
                                    type="button"
                                    className="primary-action-button"
                                    onClick={() =>
                                        setCreateTaskOpen(
                                            true
                                        )
                                    }
                                >

                                    <Plus
                                        size={17}
                                    />

                                    Create Task

                                </button>

                            </div>

                        </div>


                        <TaskToolbar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            priorityFilter={priorityFilter}
                            setPriorityFilter={setPriorityFilter}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />


                        {error && (
                            <ErrorMessage
                                message={error}
                            />
                        )}


                        {loading ? (

                            <Loading />

                        ) : (

                            <TaskList
                                tasks={filteredTasks}
                                onToggle={toggleTask}
                                onView={setDetailsTask}
                                onEdit={setEditTask}
                                onDelete={setDeleteTask}
                            />

                        )}

                    </div>

                </div>

            </main>


            <CreateTaskModal
                isOpen={createTaskOpen}
                onClose={() =>
                    setCreateTaskOpen(false)
                }
                categories={categories}
                onCreate={handleCreateTask}
            />


            <EditTaskModal
                isOpen={Boolean(editTask)}
                task={editTask}
                categories={categories}
                onClose={() =>
                    setEditTask(null)
                }
                onUpdate={handleUpdateTask}
            />


            <TaskDetailsModal
                isOpen={Boolean(detailsTask)}
                task={detailsTask}
                onClose={() =>
                    setDetailsTask(null)
                }
            />


            <ConfirmDeleteModal
                isOpen={Boolean(deleteTask)}
                task={deleteTask}
                onClose={() =>
                    setDeleteTask(null)
                }
                onConfirm={handleDeleteTask}
            />


            <ProfileModal
                isOpen={profileOpen}
                onClose={() =>
                    setProfileOpen(false)
                }
            />


            <CategoriesModal
                isOpen={categoriesOpen}
                onClose={() =>
                    setCategoriesOpen(false)
                }
                categories={categories}
                onCreateCategory={
                    createCategory
                }
                onUpdateCategory={
                    updateCategory
                }
                onDeleteCategory={
                    deleteCategory
                }
            />

        </div>
    );
};


export default AppDashboard;