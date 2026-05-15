const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "completed",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: "pending",
      });

    const inProgressTasks =
      await Task.countDocuments({
        status: "in-progress",
      });

    const overdueTasks =
      await Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "completed" },
      });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};