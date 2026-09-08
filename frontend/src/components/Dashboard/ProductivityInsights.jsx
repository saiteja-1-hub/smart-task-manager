import {
AlertTriangle,
CheckCircle2,
Flame,
ListChecks,
Target,
TrendingUp,
} from "lucide-react";

import {
getCompletedThisWeek,
getProductivityMessage,
getProductivityScore,
getTaskStats,
} from "../../utils/smartTask";

const ProductivityInsights = ({
tasks = [],
}) => {
const stats =
getTaskStats(tasks);


const completedThisWeek =
    getCompletedThisWeek(tasks);

const productivityScore =
    getProductivityScore(tasks);

const productivityMessage =
    getProductivityMessage(tasks);

const getScoreLabel = () => {
    if (productivityScore >= 80) {
        return "Excellent";
    }

    if (productivityScore >= 60) {
        return "Good";
    }

    if (productivityScore >= 40) {
        return "Getting there";
    }

    if (productivityScore > 0) {
        return "Needs focus";
    }

    return "No activity";
};

const insights = [
    {
        label: "Completion Rate",
        value: `${stats.completionRate}%`,
        description:
            "of all your tasks completed",
        icon: Target,
        className:
            "insight-completion",
    },
    {
        label: "Completed This Week",
        value: completedThisWeek,
        description:
            "tasks completed this week",
        icon: CheckCircle2,
        className:
            "insight-weekly",
    },
    {
        label: "Overdue",
        value: stats.overdue,
        description:
            stats.overdue === 1
                ? "task needs attention"
                : "tasks need attention",
        icon: AlertTriangle,
        className:
            "insight-overdue",
    },
    {
        label: "High Priority",
        value: stats.highPriority,
        description:
            "important pending tasks",
        icon: Flame,
        className:
            "insight-priority",
    },
];

return (
    <section className="productivity-section">
        <div className="productivity-heading">
            <div>
                <span className="section-eyebrow">
                    PRODUCTIVITY
                </span>

                <h2>
                    Your productivity insights
                </h2>

                <p>
                    Understand your progress and
                    keep improving your workflow.
                </p>
            </div>

            <div className="productivity-score">
                <div
                    className="productivity-score-circle"
                    style={{
                        "--score":
                            productivityScore,
                    }}
                >
                    <strong>
                        {productivityScore}
                    </strong>

                    <span>/100</span>
                </div>

                <div>
                    <span>
                        Productivity Score
                    </span>

                    <strong>
                        {getScoreLabel()}
                    </strong>
                </div>
            </div>
        </div>

        <div className="productivity-grid">
            {insights.map((insight) => {
                const Icon =
                    insight.icon;

                return (
                    <div
                        className={`productivity-card ${insight.className}`}
                        key={insight.label}
                    >
                        <div className="productivity-card-icon">
                            <Icon size={19} />
                        </div>

                        <div className="productivity-card-content">
                            <span>
                                {insight.label}
                            </span>

                            <strong>
                                {insight.value}
                            </strong>

                            <small>
                                {
                                    insight.description
                                }
                            </small>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="productivity-message">
            <div className="productivity-message-icon">
                <TrendingUp size={18} />
            </div>

            <div>
                <strong>
                    Smart insight
                </strong>

                <p>
                    {productivityMessage}
                </p>
            </div>
        </div>

        <div className="productivity-summary">
            <div>
                <ListChecks size={16} />

                <span>
                    {stats.total} total tasks
                </span>
            </div>

            <div>
                <CheckCircle2 size={16} />

                <span>
                    {stats.completed} completed
                </span>
            </div>

            <div>
                <Target size={16} />

                <span>
                    {stats.pending} pending
                </span>
            </div>
        </div>
    </section>
);


};

export default ProductivityInsights;
