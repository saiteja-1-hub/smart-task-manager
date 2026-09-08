const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 6;
};

const isValidPriority = (priority) => {
    return ["LOW", "MEDIUM", "HIGH"].includes(priority);
};

const isValidStatus = (status) => {
    return ["TODO", "IN_PROGRESS", "COMPLETED"].includes(status);
};

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidPriority,
    isValidStatus,
};