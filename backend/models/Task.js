const mongoose =
  require("mongoose");

const taskSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,

        required: true,
      },

      description: {
        type: String,
      },

      status: {

        type: String,

        enum: [
          "pending",
          "in-progress",
          "completed",
        ],

        default:
          "pending",
      },

      progress: {

        type: Number,

        default: 0,
      },

      dueDate: {
        type: Date,
      },

      project: {

        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Project",
      },

      assignedTo: {

        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      createdBy: {

        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Task ||

  mongoose.model(
    "Task",
    taskSchema
  );