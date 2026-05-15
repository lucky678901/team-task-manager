import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import Notifications from "../components/Notifications";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("all");

  const [dueDate, setDueDate] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchTasks();

    fetchUsers();

  }, []);

  // FETCH TASKS

  const fetchTasks =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://helpful-light-production-003e.up.railway.app/api/tasks",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTasks(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH USERS

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "https://helpful-light-production-003e.up.railway.app/api/users",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUsers(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // CREATE TASK

  const createTask =
    async (e) => {

      e.preventDefault();

      // VALIDATION

      if (
        !title ||
        !description ||
        !dueDate
      ) {

        return alert(
          "Fill all fields"
        );
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "https://helpful-light-production-003e.up.railway.app/api/tasks",

          {
            title,

            description,

            status:
              "pending",

            progress: 0,

            dueDate,

            project:
              "6a06b534ca04f1837ad4bf6d",

            assignedTo,
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

        setDueDate("");

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  // UPDATE TASK

  const updateStatus =
    async (
      id,
      status,
      progress
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `https://helpful-light-production-003e.up.railway.app/api/tasks/${id}`,

          {
            status,
            progress,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  // OVERDUE TASKS

  const overdueTasks =
    tasks.filter((task) => {

      return (

        new Date(
          task.dueDate
        ) < new Date()

        &&

        task.status !==
        "completed"
      );

    }).length;

  // GRAPH DATA

  const data = [

    {
      name: "Pending",

      value:
        tasks.filter(
          (t) =>
            t.status ===
            "pending"
        ).length,
    },

    {
      name: "In Progress",

      value:
        tasks.filter(
          (t) =>
            t.status ===
            "in-progress"
        ).length,
    },

    {
      name: "Completed",

      value:
        tasks.filter(
          (t) =>
            t.status ===
            "completed"
        ).length,
    },
  ];

  const COLORS = [

    "#ffcc00",

    "#3399ff",

    "#00ff99",
  ];

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

        {/* HEADER */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "40px",
          }}
        >

          <div>

            <h1
              style={{
                fontSize: "42px",
              }}
            >
              Dashboard 
            </h1>

            <p
              style={{
                color: "#cccccc",

                marginTop: "10px",
              }}
            >
              Welcome {user?.name}
            </p>

          </div>

          <button
            onClick={() => {

              localStorage.clear();

              window.location.href =
                "/";
            }}

            style={{
              padding: "14px 24px",

              border: "none",

              borderRadius: "14px",

              background:
                "linear-gradient(90deg,#ff4444,#cc0000)",

              color: "white",

              cursor: "pointer",

              fontWeight: "bold",
            }}
          >
            Logout
          </button>

        </div>

        {/* ANALYTICS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: "25px",

            marginBottom: "40px",
          }}
        >

          {/* PIE CHART */}

          <div style={glassCard}>

            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Task Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={data}

                  cx="50%"

                  cy="50%"

                  outerRadius={100}

                  dataKey="value"

                  label
                >

                  {data.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}

                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* SUMMARY */}

          <div style={glassCard}>

            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Summary
            </h2>

            <div style={summaryCard}>
              Total Tasks:
              {tasks.length}
            </div>

            <div style={summaryCard}>
              Pending:
              {
                data[0].value
              }
            </div>

            <div style={summaryCard}>
              In Progress:
              {
                data[1].value
              }
            </div>

            <div style={summaryCard}>
              Completed:
              {
                data[2].value
              }
            </div>

            <div style={summaryCard}>
              Overdue:
              {overdueTasks}
            </div>

          </div>

        </div>

        {/* CREATE TASK */}

        {user?.role ===
          "admin" && (

          <div
            style={{
              ...glassCard,

              marginBottom:
                "40px",
            }}
          >

            <h2
              style={{
                marginBottom:
                  "20px",
              }}
            >
              Create Task
            </h2>

            <form
              onSubmit={
                createTask
              }
            >

              <input
                type="text"

                placeholder="Task Title"

                value={title}

                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

              <textarea
                placeholder="Task Description"

                value={
                  description
                }

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

              {/* ASSIGN USER */}

              <select

                value={assignedTo}

                onChange={(e) =>
                  setAssignedTo(
                    e.target.value
                  )
                }

                style={inputStyle}
              >

                <option value="all">
                  All Members
                </option>

                {users

                  .filter(
                    (u) =>
                      u.role ===
                      "member"
                  )

                  .map((user) => (

                    <option
                      key={user._id}

                      value={
                        user._id
                      }
                    >
                      {user.name}
                    </option>

                  ))}

              </select>

              {/* DUE DATE */}

              <input
                type="date"

                value={dueDate}

                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

              <button
                type="submit"

                style={buttonStyle}
              >
                Create Task
              </button>

            </form>

          </div>

        )}

        {/* TASK LIST */}

        <div style={glassCard}>

          <h2
            style={{
              marginBottom: "25px",
            }}
          >
            Task List
          </h2>

          {tasks

            .filter((task) => {

              if (
                user?.role ===
                "admin"
              ) {

                return true;
              }

              return (

                task.assignedTo
                  ?._id ===
                user?._id
              );
            })

            .map((task) => (

              <div
                key={task._id}

                style={{
                  padding: "20px",

                  borderRadius:
                    "20px",

                  marginBottom:
                    "20px",

                  background:
                    "rgba(255,255,255,0.05)",
                }}
              >

                <h3>
                  {task.title}
                </h3>

                <p
                  style={{
                    color:
                      "#cccccc",

                    marginTop:
                      "10px",
                  }}
                >
                  {
                    task.description
                  }
                </p>

                <p
                  style={{
                    marginTop:
                      "10px",
                  }}
                >
                  Assigned To:
                  {
                    task.assignedTo
                      ?.name
                  }
                </p>

                <p
                  style={{
                    marginTop:
                      "10px",
                  }}
                >
                  Due Date:
                  {
                    new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  }
                </p>

                {/* PROGRESS BAR */}

                <div
                  style={{
                    width: "100%",

                    height: "14px",

                    background:
                      "#222",

                    borderRadius:
                      "20px",

                    overflow:
                      "hidden",

                    marginTop:
                      "15px",
                  }}
                >

                  <div
                    style={{
                      width: `${Number(task.progress) || 0}%`,

                      height:
                        "100%",

                      background:

                        Number(
                          task.progress
                        ) < 50

                          ? "#ffcc00"

                          : Number(
                              task.progress
                            ) < 100

                          ? "#3399ff"

                          : "#00ff99",

                      transition:
                        "0.5s",
                    }}
                  />

                </div>

                <p
                  style={{
                    marginTop:
                      "10px",

                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    task.progress || 0
                  }
                  % Completed
                </p>

                {/* MEMBER BUTTONS */}

                {user?.role ===
                  "member" && (

                  <div
                    style={{
                      display:
                        "flex",

                      gap: "10px",

                      marginTop:
                        "15px",

                      flexWrap:
                        "wrap",
                    }}
                  >

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "pending",
                          25
                        )
                      }

                      style={
                        smallBtn
                      }
                    >
                      25%
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "in-progress",
                          50
                        )
                      }

                      style={
                        smallBtn
                      }
                    >
                      50%
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "in-progress",
                          75
                        )
                      }

                      style={
                        smallBtn
                      }
                    >
                      75%
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "completed",
                          100
                        )
                      }

                      style={
                        smallBtn
                      }
                    >
                      100%
                    </button>

                  </div>

                )}

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}

const glassCard = {

  padding: "25px",

  borderRadius: "25px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.1)",
};

const summaryCard = {

  padding: "16px",

  marginBottom: "15px",

  borderRadius: "14px",

  background:
    "rgba(255,255,255,0.05)",

  fontWeight: "bold",
};

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

const smallBtn = {

  padding: "10px 16px",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  background:
    "linear-gradient(90deg,#6C63FF,#3399FF)",

  color: "white",
};

export default Dashboard;