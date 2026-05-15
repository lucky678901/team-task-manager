const express =
  require("express");

const router =
  express.Router();

const {

  getTasks,

  createTask,

  updateTask,

  deleteTask,

} = require(
  "../controllers/taskController"
);

const protect = require(
  "../middleware/authMiddleware"
);

// GET TASKS

router.get(
  "/",
  protect,
  getTasks
);

// CREATE TASK

router.post(
  "/",
  protect,
  createTask
);

// UPDATE TASK

router.put(
  "/:id",
  protect,
  updateTask
);

// DELETE TASK

router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;