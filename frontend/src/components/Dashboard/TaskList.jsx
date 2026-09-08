
import {
    CheckCircle2,
    ClipboardList,
} from "lucide-react";

import TaskCard from "./TaskCard";

const TaskList = ({
    tasks = [],
    onToggle,
    onEdit,
    onDelete,
    onView,
}) => {
    if (!tasks.length) {
        return (
            <div className="empty-task-state">
                <div className="empty-task-icon">
                    <ClipboardList size={34} />
                </div>

                <div className="empty-task-content">
                    <h3>No tasks found</h3>

                    <p>
                        You don't have any tasks matching
                        your current filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list">

            <div className="task-list-header">
                <div className="task-list-title">
                    <CheckCircle2 size={18} />
                    <span>
                        Your Task List
                    </span>
                </div>

                <span className="task-list-count">
                    {tasks.length}{" "}
                    {tasks.length === 1
                        ? "task"
                        : "tasks"}
                </span>
            </div>

            <div className="task-list-items">
                {tasks.map((task) => {
                    const taskId =
                        task?.id ??
                        task?._id ??
                        task?.task_id;

                    return (
                        <TaskCard
                            key={taskId}
                            task={task}
                            onToggle={onToggle}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onView={onView}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TaskList;

