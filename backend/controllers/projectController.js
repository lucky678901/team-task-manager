const Project = require("../models/Project");

// GET PROJECTS

const getProjects = async (
  req,
  res
) => {
  try {

    const projects =
      await Project.find();

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// CREATE PROJECT

const createProject = async (
  req,
  res
) => {
  try {

    // ONLY ADMIN

    if (
      req.user.role !== "admin"
    ) {

      return res
        .status(403)
        .json({
          message:
            "Only admin can create projects",
        });

    }

    const project =
      await Project.create({

        title:
          req.body.title,

        description:
          req.body.description,

        createdBy:
          req.user.id,
      });

    res.status(201).json(
      project
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getProjects,

  createProject,
};