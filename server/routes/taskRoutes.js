const express = require("express");

const {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
} = require("../controllers/taskController");

const router = express.Router();


// GET all tasks
router.get("/", getTasks);

// GET single task
router.get("/:id", getTask);

// CREATE task
router.post("/", addTask);

// UPDATE task
router.put("/:id", editTask);

// DELETE task
router.delete("/:id", removeTask);

// CHANGE task status
router.patch(
    "/:id/status",
    changeTaskStatus
);

module.exports = router;