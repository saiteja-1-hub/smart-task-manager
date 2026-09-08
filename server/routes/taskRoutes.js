const express = require("express");

const {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", addTask);

router.put("/:id", editTask);

router.delete("/:id", removeTask);

router.patch("/:id/status", changeTaskStatus);

module.exports = router;