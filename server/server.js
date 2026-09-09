
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");

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
            "https://smart-task-manager-n9oa.onrender.com",
        ],
        credentials: true,
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
// DATABASE CONNECTION TEST
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
            "Database connection error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});


// ============================================
// DATABASE DIAGNOSTIC
// ============================================

app.get("/api/db-test", async (req, res) => {
    try {
        // Check current database, user and schema
        const connectionResult = await pool.query(`
            SELECT
                current_database() AS database,
                current_user AS user,
                current_schema() AS schema
        `);

        // Check available tables
        const tablesResult = await pool.query(`
            SELECT
                table_schema,
                table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);

        // Check specifically for categories
        const categoriesResult = await pool.query(`
            SELECT COUNT(*) AS count
            FROM public.categories
        `);

        // Check specifically for tasks
        const tasksResult = await pool.query(`
            SELECT COUNT(*) AS count
            FROM public.tasks
        `);

        res.json({
            success: true,

            connection: connectionResult.rows[0],

            tables: tablesResult.rows,

            data: {
                categories: categoriesResult.rows[0].count,
                tasks: tasksResult.rows[0].count,
            },
        });
    } catch (error) {
        console.error(
            "Database diagnostic error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
            code: error.code,
        });
    }
});


// ============================================
// API ROUTES
// ============================================

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

