
import {
    CalendarDays,
    Check,
    Clock3,
    Eye,
    Flag,
    Pencil,
    Trash2,
} from "lucide-react";

const TaskCard = ({
    task,
    onToggle,
    onEdit,
    onDelete,
    onView,
}) => {
    const taskId =
        task?.id ??
        task?._id ??
        task?.task_id;

    const title = task?.title || "Untitled Task";

    const description =
        task?.description ||
        "No description added.";

    const status = String(
        task?.status || "TODO"
    ).toUpperCase();

    const priority = String(
        task?.priority || "MEDIUM"
    ).toUpperCase();

    const category =
        task?.category?.name ||
        task?.category_name ||
        task?.category ||
        "Personal";

    const isCompleted =
        status === "COMPLETED" ||
        status === "DONE";

    const getPriorityClass = () => {
        if (priority === "HIGH") {
            return "priority-high";
        }

        if (priority === "LOW") {
            return "priority-low";
        }

        return "priority-medium";
    };

    const getPriorityText = () => {
        if (priority === "HIGH") return "High";
        if (priority === "LOW") return "Low";

        return "Medium";
    };

    const getCategoryClass = () => {
        return `category-${category
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
    };

    const getStatusText = () => {
        if (status === "COMPLETED" || status === "DONE") {
            return "Completed";
        }

        if (
            status === "IN_PROGRESS" ||
            status === "IN-PROGRESS"
        ) {
            return "In Progress";
        }

        return "To Do";
    };

    const formatDueDate = () => {
        if (!task?.due_date && !task?.dueDate) {
            return "No due date";
        }

        const dateValue =
            task?.due_date ||
            task?.dueDate;

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "No due date";
        }

        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    const handleToggle = () => {
        onToggle(task);
    };

    const handleEdit = () => {
        onEdit(task);
    };

    const handleDelete = () => {
        onDelete(task);
    };

    const handleView = () => {
        onView(task);
    };

    return (
        <article
            className={`task-card ${
                isCompleted
                    ? "task-card-completed"
                    : ""
            }`}
        >
            {/* Priority indicator */}
            <div
                className={`task-priority-line ${getPriorityClass()}`}
            />

            <div className="task-card-content">

                {/* Top row */}
                <div className="task-card-top">

                    <button
                        type="button"
                        className={`task-checkbox ${
                            isCompleted
                                ? "task-checkbox-checked"
                                : ""
                        }`}
                        onClick={handleToggle}
                        aria-label={
                            isCompleted
                                ? "Mark task as incomplete"
                                : "Mark task as completed"
                        }
                    >
                        {isCompleted && (
                            <Check size={15} />
                        )}
                    </button>

                    <div className="task-main-content">

                        <div className="task-title-row">
                            <h3
                                className={
                                    isCompleted
                                        ? "completed-title"
                                        : ""
                                }
                            >
                                {title}
                            </h3>
                        </div>

                        <p className="task-description">
                            {description}
                        </p>

                        {/* Badges */}
                        <div className="task-meta">

                            <span
                                className={`task-badge ${getPriorityClass()}`}
                            >
                                <Flag size={13} />
                                {getPriorityText()}
                            </span>

                            <span
                                className={`task-badge category-badge ${getCategoryClass()}`}
                            >
                                {category}
                            </span>

                            <span
                                className={`task-status-badge ${
                                    isCompleted
                                        ? "status-completed"
                                        : status ===
                                            "IN_PROGRESS"
                                        ? "status-progress"
                                        : "status-todo"
                                }`}
                            >
                                <span className="status-dot" />
                                {getStatusText()}
                            </span>

                            <span className="task-due-date">
                                <CalendarDays
                                    size={14}
                                />
                                {formatDueDate()}
                            </span>

                        </div>
                    </div>
                </div>

                {/* Bottom action bar */}
                <div className="task-card-footer">

                    <div className="task-footer-info">
                        <Clock3 size={14} />

                        <span>
                            {isCompleted
                                ? "Task completed"
                                : "Keep making progress"}
                        </span>
                    </div>

                    <div className="task-actions">

                        <button
                            type="button"
                            className="task-action-button view-action"
                            onClick={handleView}
                            title="View task"
                            aria-label="View task"
                        >
                            <Eye size={16} />
                            <span>View</span>
                        </button>

                        <button
                            type="button"
                            className="task-action-button edit-action"
                            onClick={handleEdit}
                            title="Edit task"
                            aria-label="Edit task"
                        >
                            <Pencil size={16} />
                            <span>Edit</span>
                        </button>

                        <button
                            type="button"
                            className="task-action-button delete-action"
                            onClick={handleDelete}
                            title="Delete task"
                            aria-label="Delete task"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;

