const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// ============================================
// MIDDLEWARE
// ============================================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://smart-task-manager-n9oa.onrender.com/"
        ],
        credentials: true
    })
);


app.use(express.json());


// ============================================
// HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart To-Do Manager API is running",
    });
});


// ============================================
// DATABASE TEST
// ============================================

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json({
            success: true,
            message: "PostgreSQL connection successful",
            time: result.rows[0].now,
        });
    } catch (error) {
        console.error(
            "Database error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});


// ============================================
// API ROUTES
// ============================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

app.use(
    "/api/categories",
    categoryRoutes
);


// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


// ============================================
// ERROR HANDLER
// ============================================

app.use(errorMiddleware);


// ============================================
// START SERVER
// ============================================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT}`
    );
});