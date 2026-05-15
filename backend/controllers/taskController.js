const Task =
  require("../models/Task");

const User =
  require("../models/User");

// GET TASKS

const getTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find()

          .populate(
            "assignedTo",
            "name email"
          )

          .populate(
            "project",
            "title"
          );

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// CREATE TASK

const createTask =
  async (req, res) => {

    if (
      req.user.role !==
      "admin"
    ) {

      return res
        .status(403)
        .json({
          message:
            "Only admin can create tasks",
        });
    }

    try {

      const {

        title,

        description,

        status,

        dueDate,

        project,

        assignedTo,

        progress,

      } = req.body;

      // ALL MEMBERS

      if (
        assignedTo === "all"
      ) {

        const members =
          await User.find({

            role: "member",
          });

        const tasks =
          await Promise.all(

            members.map(
              async (
                member
              ) => {

                return await Task.create({

                  title,

                  description,

                  status,

                  dueDate,

                  project,

                  assignedTo:
                    member._id,

                  progress:
                    progress || 0,

                  createdBy:
                    req.user.id,
                });
              }
            )
          );

        return res
          .status(201)
          .json(tasks);
      }

      // SINGLE USER

      const task =
        await Task.create({

          title,

          description,

          status,

          dueDate,

          project,

          assignedTo,

          progress:
            progress || 0,

          createdBy:
            req.user.id,
        });

      res.status(201).json(
        task
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// UPDATE TASK

const updateTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });
      }

      // MEMBER CAN UPDATE ONLY OWN TASK

      if (

        req.user.role ===
          "member"

        &&

        task.assignedTo.toString()
          !== req.user.id

      ) {

        return res
          .status(403)
          .json({
            message:
              "Access denied",
          });
      }

      task.title =
        req.body.title ||
        task.title;

      task.description =
        req.body.description ||
        task.description;

      task.status =
        req.body.status ||
        task.status;

      task.progress =
        req.body.progress ??
        task.progress;

      task.dueDate =
        req.body.dueDate ||
        task.dueDate;

      const updatedTask =
        await task.save();

      res.json(
        updatedTask
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// DELETE TASK

const deleteTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });
      }

      if (
        req.user.role !==
        "admin"
      ) {

        return res
          .status(403)
          .json({
            message:
              "Only admin can delete tasks",
          });
      }

      await task.deleteOne();

      res.json({
        message:
          "Task deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {

  getTasks,

  createTask,

  updateTask,

  deleteTask,
};