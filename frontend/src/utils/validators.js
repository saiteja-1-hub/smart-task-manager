const isValidPriority = (priority) => {
    const validPriorities = [
        "LOW",
        "MEDIUM",
        "HIGH",
    ];

    return validPriorities.includes(
        String(priority).toUpperCase()
    );
};

const isValidStatus = (status) => {
    const validStatuses = [
        "TODO",
        "IN_PROGRESS",
        "COMPLETED",
    ];

    return validStatuses.includes(
        String(status).toUpperCase()
    );
};

module.exports = {
    isValidPriority,
    isValidStatus,
};