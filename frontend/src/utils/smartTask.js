const getTaskId = (task) => {
return (
task?.id ??
task?._id ??
task?.task_id ??
null
);
};

const normalizeStatus = (status) => {
return String(status || "TODO")
.trim()
.toUpperCase()
.replace("-", "_");
};

const normalizePriority = (priority) => {
return String(priority || "MEDIUM")
.trim()
.toUpperCase();
};

const isCompletedTask = (task) => {
const status = normalizeStatus(task?.status);


return (
    status === "COMPLETED" ||
    status === "DONE"
);


};

const isInProgressTask = (task) => {
return (
normalizeStatus(task?.status) ===
"IN_PROGRESS"
);
};

const getDueDate = (task) => {
const value =
task?.due_date ??
task?.dueDate ??
task?.deadline ??
null;


if (!value) {
    return null;
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
    return null;
}

return date;


};

const getDaysUntilDue = (task) => {
const dueDate = getDueDate(task);


if (!dueDate) {
    return null;
}

const now = new Date();

const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
);

const due = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate()
);

const difference =
    due.getTime() - today.getTime();

return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
);


};

const getPriorityScore = (priority) => {
const normalized = normalizePriority(priority);


if (normalized === "HIGH") {
    return 40;
}

if (normalized === "MEDIUM") {
    return 25;
}

return 10;


};

const getDeadlineScore = (task) => {
const daysUntilDue =
getDaysUntilDue(task);


if (daysUntilDue === null) {
    return 0;
}

if (daysUntilDue < 0) {
    return 50;
}

if (daysUntilDue === 0) {
    return 45;
}

if (daysUntilDue === 1) {
    return 40;
}

if (daysUntilDue <= 3) {
    return 30;
}

if (daysUntilDue <= 7) {
    return 20;
}

return 5;


};

const getStatusScore = (task) => {
if (isInProgressTask(task)) {
return 15;
}


return 0;


};

const getDescriptionScore = (task) => {
const description =
task?.description || "";


if (!description.trim()) {
    return 0;
}

return 5;


};

const calculateTaskScore = (task) => {
if (!task || isCompletedTask(task)) {
return -Infinity;
}


const priorityScore =
    getPriorityScore(task?.priority);

const deadlineScore =
    getDeadlineScore(task);

const statusScore =
    getStatusScore(task);

const descriptionScore =
    getDescriptionScore(task);

return (
    priorityScore +
    deadlineScore +
    statusScore +
    descriptionScore
);


};

const getRecommendationReason = (task) => {
if (!task) {
return "No pending tasks available.";
}


const priority =
    normalizePriority(task?.priority);

const daysUntilDue =
    getDaysUntilDue(task);

if (daysUntilDue !== null) {
    if (daysUntilDue < 0) {
        return "This task is overdue and should be handled as soon as possible.";
    }

    if (daysUntilDue === 0) {
        return "This task is due today, so it should be your immediate focus.";
    }

    if (daysUntilDue === 1) {
        return "This task is due tomorrow and needs your attention soon.";
    }
}

if (priority === "HIGH") {
    return "This is a high-priority task and should be completed before lower-priority work.";
}

if (isInProgressTask(task)) {
    return "You already started this task. Finishing it can help maintain your momentum.";
}

if (
    daysUntilDue !== null &&
    daysUntilDue <= 3
) {
    return "This task has an approaching deadline.";
}

return "This task is currently one of the most important items in your task list.";
 

};

const getRecommendationLabel = (task) => {
if (!task) {
return "No recommendation";
}
 

const daysUntilDue =
    getDaysUntilDue(task);

if (daysUntilDue !== null) {
    if (daysUntilDue < 0) {
        return "Overdue";
    }

    if (daysUntilDue === 0) {
        return "Due today";
    }

    if (daysUntilDue === 1) {
        return "Due tomorrow";
    }
}

if (
    normalizePriority(task?.priority) ===
    "HIGH"
) {
    return "High priority";
}

if (isInProgressTask(task)) {
    return "Continue progress";
}

return "Recommended";
 

};

 
const getSmartRecommendation = (tasks = []) => {
    const pendingTasks = tasks.filter(
        (task) => !isCompletedTask(task)
    );

    if (!pendingTasks.length) {
        return null;
    }

    const priorityOrder = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
    };

    const getDeadlineRank = (task) => {
        const daysUntilDue =
            getDaysUntilDue(task);

        // Lower number = more urgent
        if (daysUntilDue === null) {
            return 999;
        }

        if (daysUntilDue < 0) {
            return 0;
        }

        if (daysUntilDue === 0) {
            return 1;
        }

        if (daysUntilDue === 1) {
            return 2;
        }

        if (daysUntilDue <= 3) {
            return 3;
        }

        if (daysUntilDue <= 7) {
            return 4;
        }

        return 5;
    };

    const scoredTasks = pendingTasks.map(
        (task) => ({
            task,
            deadlineRank:
                getDeadlineRank(task),

            priorityRank:
                priorityOrder[
                    normalizePriority(
                        task?.priority
                    )
                ] || 2,

            inProgress:
                isInProgressTask(task)
                    ? 1
                    : 0,

            createdAt:
                new Date(
                    task?.created_at ||
                    task?.createdAt ||
                    0
                ).getTime(),
        })
    );

    scoredTasks.sort((a, b) => {

        // ====================================
        // 1. DEADLINE
        // ====================================

        if (
            a.deadlineRank !==
            b.deadlineRank
        ) {
            return (
                a.deadlineRank -
                b.deadlineRank
            );
        }


        // ====================================
        // 2. PRIORITY
        // ====================================

        if (
            a.priorityRank !==
            b.priorityRank
        ) {
            return (
                b.priorityRank -
                a.priorityRank
            );
        }


        // ====================================
        // 3. IN-PROGRESS TASK
        // ====================================

        if (
            a.inProgress !==
            b.inProgress
        ) {
            return (
                b.inProgress -
                a.inProgress
            );
        }


        // ====================================
        // 4. OLDEST TASK FIRST
        // ====================================

        return (
            a.createdAt -
            b.createdAt
        );
    });

    const best =
        scoredTasks[0];

    if (!best) {
        return null;
    }

    return {
        task: best.task,

        score:
            100 -
            best.deadlineRank * 10 +
            best.priorityRank * 5,

        reason:
            getRecommendationReason(
                best.task
            ),

        label:
            getRecommendationLabel(
                best.task
            ),
    };
};
 
 

const getTaskStats = (tasks = []) => {
const total = tasks.length;
 

const completed = tasks.filter(
    (task) => isCompletedTask(task)
).length;

const pending = tasks.filter(
    (task) => !isCompletedTask(task)
).length;

const inProgress = tasks.filter(
    (task) => isInProgressTask(task)
).length;

const overdue = tasks.filter((task) => {
    if (isCompletedTask(task)) {
        return false;
    }

    const daysUntilDue =
        getDaysUntilDue(task);

    return (
        daysUntilDue !== null &&
        daysUntilDue < 0
    );
}).length;

const highPriority = tasks.filter(
    (task) =>
        !isCompletedTask(task) &&
        normalizePriority(task?.priority) ===
            "HIGH"
).length;

const dueToday = tasks.filter((task) => {
    if (isCompletedTask(task)) {
        return false;
    }

    return getDaysUntilDue(task) === 0;
}).length;

const dueTomorrow = tasks.filter((task) => {
    if (isCompletedTask(task)) {
        return false;
    }

    return getDaysUntilDue(task) === 1;
}).length;

const completionRate =
    total > 0
        ? Math.round(
              (completed / total) * 100
          )
        : 0;

return {
    total,
    completed,
    pending,
    inProgress,
    overdue,
    highPriority,
    dueToday,
    dueTomorrow,
    completionRate,
};


};

const getCompletedThisWeek = (tasks = []) => {
const now = new Date();


const day =
    now.getDay() === 0
        ? 7
        : now.getDay();

const startOfWeek = new Date(now);

startOfWeek.setDate(
    now.getDate() - day + 1
);

startOfWeek.setHours(
    0,
    0,
    0,
    0
);

return tasks.filter((task) => {
    if (!isCompletedTask(task)) {
        return false;
    }

    const completedValue =
        task?.completed_at ??
        task?.completedAt ??
        task?.updated_at ??
        task?.updatedAt ??
        null;

    if (!completedValue) {
        return false;
    }

    const completedDate =
        new Date(completedValue);

    if (
        Number.isNaN(
            completedDate.getTime()
        )
    ) {
        return false;
    }

    return completedDate >= startOfWeek;
}).length;


};

const getProductivityScore = (tasks = []) => {
const stats = getTaskStats(tasks);


if (stats.total === 0) {
    return 0;
}

let score = 0;

score +=
    stats.completionRate * 0.6;

const overduePenalty =
    Math.min(
        stats.overdue * 8,
        25
    );

score -= overduePenalty;

if (
    stats.pending === 0 &&
    stats.completed > 0
) {
    score += 10;
}

return Math.max(
    0,
    Math.min(
        100,
        Math.round(score)
    )
);


};

const getProductivityMessage = (
tasks = []
) => {
const stats = getTaskStats(tasks);


if (stats.total === 0) {
    return "Create your first task and start building your productivity streak.";
}

if (stats.overdue > 0) {
    return `You have ${stats.overdue} overdue ${
        stats.overdue === 1
            ? "task"
            : "tasks"
    }. Clearing them should be your next priority.`;
}

if (stats.dueToday > 0) {
    return `You have ${stats.dueToday} task${
        stats.dueToday === 1
            ? ""
            : "s"
    } due today. Stay focused and finish them.`;
}

if (stats.completionRate >= 80) {
    return "Excellent work! You're maintaining a strong completion rate.";
}

if (stats.completionRate >= 50) {
    return "You're making good progress. Keep completing tasks consistently.";
}

return "Focus on completing a few important tasks today to build momentum.";


};

const getDaysLabel = (task) => {
const days =
getDaysUntilDue(task);


if (days === null) {
    return "No deadline";
}

if (days < 0) {
    const count = Math.abs(days);

    return `${count} day${
        count === 1 ? "" : "s"
    } overdue`;
}

if (days === 0) {
    return "Due today";
}

if (days === 1) {
    return "Due tomorrow";
}

return `Due in ${days} days`;


};

export {
getTaskId,
normalizeStatus,
normalizePriority,
isCompletedTask,
isInProgressTask,
getDueDate,
getDaysUntilDue,
calculateTaskScore,
getRecommendationReason,
getRecommendationLabel,
getSmartRecommendation,
getTaskStats,
getCompletedThisWeek,
getProductivityScore,
getProductivityMessage,
getDaysLabel,
};

export default {
getTaskId,
normalizeStatus,
normalizePriority,
isCompletedTask,
isInProgressTask,
getDueDate,
getDaysUntilDue,
calculateTaskScore,
getRecommendationReason,
getRecommendationLabel,
getSmartRecommendation,
getTaskStats,
getCompletedThisWeek,
getProductivityScore,
getProductivityMessage,
getDaysLabel,
};
