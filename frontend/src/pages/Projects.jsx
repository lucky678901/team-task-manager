import Sidebar from "../components/Sidebar";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

function Projects() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/projects",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setProjects(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const createProject =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/projects",

          {
            title,
            description,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setTitle("");

        setDescription("");

        fetchProjects();

        alert(
          "Project Created"
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div
      style={{
        display: "flex",

        background:
          "linear-gradient(135deg,#000000,#111111,#1a1a1a)",

        minHeight: "100vh",
      }}
    >

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div
        style={{
          marginLeft: isSidebarOpen
            ? "270px"
            : "40px",

          width: "100%",

          padding: "40px",

          color: "white",

          transition: "0.4s",
        }}
      >

        <h1
          style={{
            fontSize: "42px",

            marginBottom: "40px",
          }}
        >
          Projects 🚀
        </h1>

        {/* CREATE PROJECT */}

        {user?.role ===
          "admin" && (

          <div
            style={{
              padding: "25px",

              borderRadius: "25px",

              background:
                "rgba(255,255,255,0.08)",

              backdropFilter:
                "blur(12px)",

              border:
                "1px solid rgba(255,255,255,0.1)",

              marginBottom: "40px",
            }}
          >

            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Create Project
            </h2>

            <form
              onSubmit={
                createProject
              }
            >

              <input
                type="text"

                placeholder="Project Title"

                value={title}

                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

              <textarea
                placeholder="Project Description"

                value={description}

                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }

                style={{
                  ...inputStyle,

                  height: "120px",
                }}
              />

              <button
                type="submit"

                style={buttonStyle}
              >
                Create Project
              </button>

            </form>

          </div>

        )}

        {/* PROJECT LIST */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",

            gap: "25px",
          }}
        >

          {projects.map(
            (project) => (

              <div
                key={project._id}

                style={{
                  padding: "25px",

                  borderRadius: "25px",

                  background:
                    "rgba(255,255,255,0.08)",

                  backdropFilter:
                    "blur(12px)",

                  border:
                    "1px solid rgba(255,255,255,0.1)",
                }}
              >

                <h2>
                  {project.title}
                </h2>

                <p
                  style={{
                    color: "#cccccc",

                    marginTop: "12px",

                    lineHeight: "1.6",
                  }}
                >
                  {
                    project.description
                  }
                </p>

                <div
                  style={{
                    marginTop: "20px",

                    padding: "10px 14px",

                    borderRadius: "12px",

                    background:
                      "rgba(255,255,255,0.05)",

                    display: "inline-block",

                    color: "#00ff99",

                    fontWeight: "bold",
                  }}
                >
                  Active Project
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "20px",

  borderRadius: "14px",

  border: "none",

  outline: "none",

  background:
    "rgba(255,255,255,0.08)",

  color: "white",
};

const buttonStyle = {

  padding: "14px 24px",

  border: "none",

  borderRadius: "14px",

  cursor: "pointer",

  background:
    "linear-gradient(90deg,#6C63FF,#3399FF)",

  color: "white",

  fontWeight: "bold",
};

export default Projects;