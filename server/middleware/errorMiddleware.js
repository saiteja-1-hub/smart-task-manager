const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    console.error(error);

    if (error.code === "23505") {
        return res.status(409).json({
            success: false,
            message: "A record with this value already exists",
        });
    }

    if (error.code === "23503") {
        return res.status(400).json({
            success: false,
            message: "Invalid related record",
        });
    }

    if (error.code === "23514") {
        return res.status(400).json({
            success: false,
            message: "Invalid value provided",
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};

module.exports = errorMiddleware;