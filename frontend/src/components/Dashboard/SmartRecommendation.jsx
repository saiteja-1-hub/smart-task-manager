 
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Flag,
    Lightbulb,
    Sparkles,
} from "lucide-react";

import {
    getDaysLabel,
    getSmartRecommendation,
    normalizePriority,
} from "../../utils/smartTask";

const SmartRecommendation = ({
    tasks = [],
    onView,
    onEdit,
}) => {
    const recommendation =
        getSmartRecommendation(tasks);

    if (!recommendation) {
        return (
            <section className="smart-recommendation smart-recommendation-empty">
                <div className="smart-recommendation-header">
                    <div className="smart-icon">
                        <Sparkles size={20} />
                    </div>

                    <div>
                        <span className="smart-eyebrow">
                            SMART ASSISTANT
                        </span>

                        <h2>
                            You're all caught up!
                        </h2>
                    </div>
                </div>

                <div className="smart-empty-content">
                    <CheckCircle2 size={38} />

                    <div>
                        <h3>
                            No pending tasks
                        </h3>

                        <p>
                            Great job! You've
                            completed everything
                            currently on your task
                            list.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const { task, reason, label } =
        recommendation;

    const title =
        task?.title || "Untitled Task";

    const description =
        task?.description ||
        "No description added.";

    const priority =
        normalizePriority(
            task?.priority
        );

    const category =
        task?.category?.name ||
        task?.category_name ||
        task?.category ||
        "Personal";

    /*
     * Check current task status
     */
    const currentStatus = String(
        task?.status || "TODO"
    )
        .toUpperCase()
        .replace(/-/g, "_")
        .trim();

    const isInProgress =
        currentStatus === "IN_PROGRESS";

    const getPriorityClass = () => {
        if (priority === "HIGH") {
            return "priority-high";
        }

        if (priority === "LOW") {
            return "priority-low";
        }

        return "priority-medium";
    };

    return (
        <section className="smart-recommendation">

            {/* Header */}
            <div className="smart-recommendation-header">

                <div className="smart-icon">
                    <Sparkles size={20} />
                </div>

                <div className="smart-heading-content">
                    <span className="smart-eyebrow">
                        SMART ASSISTANT
                    </span>

                    <h2>
                        Recommended next task
                    </h2>
                </div>

                <div className="smart-status">
                    <Lightbulb size={15} />
                    Smart pick
                </div>

            </div>

            {/* Task */}
            <div className="smart-task-content">

                <div className="smart-task-indicator">
                    <div className="smart-indicator-dot" />
                </div>

                <div className="smart-task-main">

                    <div className="smart-task-title-row">

                        <h3>{title}</h3>

                        <span
                            className={`task-badge ${getPriorityClass()}`}
                        >
                            <Flag size={13} />

                            {priority === "HIGH"
                                ? "High"
                                : priority === "LOW"
                                ? "Low"
                                : "Medium"}
                        </span>

                    </div>

                    <p className="smart-task-description">
                        {description}
                    </p>

                    <div className="smart-task-meta">

                        <span className="smart-meta-item">
                            <CalendarDays size={14} />
                            {getDaysLabel(task)}
                        </span>

                        <span className="smart-meta-item">
                            <Clock3 size={14} />
                            {category}
                        </span>

                        <span className="smart-recommendation-label">
                            {label}
                        </span>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="smart-recommendation-footer">

                <div className="smart-reason">
                    <Lightbulb size={16} />
                    <span>{reason}</span>
                </div>

                <div className="smart-actions">

                    {/* View */}
                    {onView && (
                        <button
                            type="button"
                            className="smart-secondary-button"
                            onClick={() =>
                                onView(task)
                            }
                        >
                            View
                        </button>
                    )}

                    {/* Start / In Progress */}
                    {onEdit && (
                        <button
                            type="button"
                            className={`smart-primary-button ${
                                isInProgress
                                    ? "task-in-progress-button"
                                    : ""
                            }`}
                            onClick={() => {
                                if (
                                    !isInProgress
                                ) {
                                    onEdit(task);
                                }
                            }}
                            disabled={
                                isInProgress
                            }
                        >
                            {isInProgress ? (
                                <>
                                    <CheckCircle2
                                        size={16}
                                    />

                                    Task In Progress
                                </>
                            ) : (
                                <>
                                    Start Task
                                    <ArrowRight
                                        size={16}
                                    />
                                </>
                            )}
                        </button>
                    )}

                </div>

            </div>
        </section>
    );
};

export default SmartRecommendation;
 
