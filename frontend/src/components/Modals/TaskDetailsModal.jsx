import {
    Calendar,
    CheckCircle2,
    Clock,
    Flag
} from "lucide-react";

import Modal from "./Modal";

import {
    formatDate
} from "../../utils/formatDate";

const TaskDetailsModal = ({
    task,
    isOpen,
    onClose,
    onEdit
}) => {

    if (!task) {
        return null;
    }

    const completed =
        task.status === "completed" ||
        task.status === "done";

    const priority =
        task.priority?.toLowerCase() ||
        "medium";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Task details"
            subtitle="View information about this task."
            size="large"
        >

            <div className="details-modal">

                <div className="details-title">
                    <h3>
                        {task.title}
                    </h3>

                    <span
                        className={`priority ${priority}`}
                    >
                        {priority}
                    </span>
                </div>

                <div
                    className={`details-status ${
                        completed
                            ? "completed"
                            : ""
                    }`}
                >
                    <CheckCircle2 size={17} />

                    {completed
                        ? "Completed"
                        : task.status || "Pending"
                    }
                </div>

                {task.description && (
                    <div className="details-description">

                        <h4>
                            Description
                        </h4>

                        <p>
                            {task.description}
                        </p>

                    </div>
                )}

                <div className="details-grid">

                    <div className="detail-box">

                        <Flag size={16} />

                        <span>
                            Priority
                        </span>

                        <strong>
                            {priority}
                        </strong>

                    </div>

                    <div className="detail-box">

                        <Calendar size={16} />

                        <span>
                            Due date
                        </span>

                        <strong>
                            {task.due_date
                                ? formatDate(
                                    task.due_date
                                )
                                : "No due date"
                            }
                        </strong>

                    </div>

                    <div className="detail-box">

                        <Clock size={16} />

                        <span>
                            Created
                        </span>

                        <strong>
                            {task.created_at
                                ? formatDate(
                                    task.created_at
                                )
                                : "Unknown"
                            }
                        </strong>

                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        className="button-secondary"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        className="button-primary"
                        onClick={() => {
                            onClose();
                            onEdit(task);
                        }}
                    >
                        Edit task
                    </button>

                </div>

            </div>

        </Modal>
    );
};

export default TaskDetailsModal;