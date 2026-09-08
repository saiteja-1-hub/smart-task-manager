export const formatDate = (date) => {
    if (!date) {
        return "No date";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "No date";
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
};

export const formatRelativeDate = (date) => {
    if (!date) {
        return "";
    }

    const target = new Date(date);
    const now = new Date();

    const difference =
        target.getTime() - now.getTime();

    const days = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days < 0) {
        return "Overdue";
    }

    if (days === 0) {
        return "Today";
    }

    if (days === 1) {
        return "Tomorrow";
    }

    return `In ${days} days`;
};