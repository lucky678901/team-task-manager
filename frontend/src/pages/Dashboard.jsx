import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Activity,
  CheckCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

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

    "#f59e0b",

    "#06b6d4",

    "#22c55e",
  ];

  return (

    <div
      style={{
        display: "flex",

        background:
          "radial-gradient(circle at top left,#312e81,#050816,#000000)",

        minHeight: "100vh",

        overflowX: "hidden",

        position: "relative",
      }}
    >

      {/* GLOW EFFECTS */}

      <div
        style={{
          position: "absolute",

          width: "450px",

          height: "450px",

          background:
            "#6C63FF",

          borderRadius: "50%",

          filter:
            "blur(180px)",

          top: "-120px",

          left: "-120px",

          opacity: 0.35,
        }}
      />

      <div
        style={{
          position: "absolute",

          width: "400px",

          height: "400px",

          background:
            "#00c6ff",

          borderRadius: "50%",

          filter:
            "blur(180px)",

          bottom: "-120px",

          right: "-120px",

          opacity: 0.35,
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div
        style={{
          marginLeft:

            window.innerWidth < 768

              ? "0px"

              : isSidebarOpen
              ? "270px"
              : "90px",

          width: "100%",

          padding:

            window.innerWidth < 768

              ? "15px"

              : "40px",

          color: "white",

          transition: "0.4s",

          zIndex: 10,
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",

            flexDirection:

              window.innerWidth < 768

                ? "column"

                : "row",

            gap: "20px",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "40px",
          }}
        >

          <div>

            <h1
              style={{

                fontSize:

                  window.innerWidth < 768

                    ? "38px"

                    : "64px",

                fontWeight: "900",

                background:
                  "linear-gradient(90deg,#6C63FF,#00c6ff,#ff4ecd)",

                WebkitBackgroundClip:
                  "text",

                WebkitTextFillColor:
                  "transparent",
              }}
            >
              Dashboard 🚀
            </h1>

            <p
              style={{
                color: "#94a3b8",

                marginTop: "12px",

                fontSize: "16px",
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
              padding: "16px 26px",

              border: "none",

              borderRadius: "18px",

              background:
                "linear-gradient(90deg,#ff4d4d,#ff0000)",

              color: "white",

              cursor: "pointer",

              fontWeight: "bold",

              boxShadow:
                "0 4px 20px rgba(255,0,0,0.3)",
            }}
          >
            Logout
          </button>

        </div>

        {/* STAT CARDS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:

              window.innerWidth < 768

                ? "1fr"

                : "repeat(4,1fr)",

            gap: "20px",

            marginBottom: "40px",
          }}
        >

          <div style={statCard1}>
            <Activity size={34} />
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div style={statCard2}>
            <Clock3 size={34} />
            <h2>{data[0].value}</h2>
            <p>Pending</p>
          </div>

          <div style={statCard3}>
            <TrendingUp size={34} />
            <h2>{data[1].value}</h2>
            <p>In Progress</p>
          </div>

          <div style={statCard4}>
            <CheckCircle size={34} />
            <h2>{data[2].value}</h2>
            <p>Completed</p>
          </div>

        </div>

        {/* ANALYTICS */}

        <div
          style={{
            ...glassCard,

            marginBottom: "40px",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",

              fontSize: "28px",
            }}
          >
            Performance Analytics 📊
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={data}

                cx="50%"

                cy="50%"

                outerRadius={120}

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

                fontSize:
                  "28px",
              }}
            >
              Create Task 🚀
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

        {/* TASKS */}

        <div style={glassCard}>

          <h2
            style={{
              marginBottom: "25px",

              fontSize: "30px",
            }}
          >
            Team Tasks 🚀
          </h2>

          {tasks.map((task) => (

            <div
              key={task._id}

              style={{

                padding: "24px",

                borderRadius: "28px",

                marginBottom: "24px",

                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.3)",
              }}
            >

              <h3
                style={{
                  fontSize: "24px",
                }}
              >
                {task.title}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",

                  marginTop: "12px",
                }}
              >
                {task.description}
              </p>

              <p
                style={{
                  marginTop: "14px",
                }}
              >
                Status:
                {task.status}
              </p>

              <p>
                Due:
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

                  height: "16px",

                  background:
                    "#111827",

                  borderRadius:
                    "20px",

                  overflow:
                    "hidden",

                  marginTop: "18px",
                }}
              >

                <div
                  style={{
                    width: `${task.progress || 0}%`,

                    height: "100%",

                    borderRadius:
                      "20px",

                    background:

                      task.progress < 50

                        ? "linear-gradient(90deg,#facc15,#f97316)"

                        : task.progress < 100

                        ? "linear-gradient(90deg,#38bdf8,#6366f1)"

                        : "linear-gradient(90deg,#22c55e,#16a34a)",

                    transition:
                      "0.5s",
                  }}
                />

              </div>

              <p
                style={{
                  marginTop: "12px",
                }}
              >
                {task.progress || 0}%
                Completed
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const glassCard = {

  padding: "28px",

  borderRadius: "32px",

  background:
    "rgba(255,255,255,0.06)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.35)",
};

const inputStyle = {

  width: "100%",

  boxSizing:
    "border-box",

  padding: "18px",

  marginBottom: "22px",

  borderRadius: "18px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  fontSize: "15px",
};

const buttonStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  cursor: "pointer",

  background:
    "linear-gradient(90deg,#6C63FF,#00c6ff)",

  color: "white",

  fontWeight: "bold",

  fontSize: "17px",

  boxShadow:
    "0 6px 24px rgba(108,99,255,0.4)",
};

const statCard1 = {

  padding: "28px",

  borderRadius: "28px",

  background:
    "linear-gradient(135deg,#4f46e5,#7c3aed)",

  color: "white",

  display: "flex",

  flexDirection: "column",

  gap: "12px",

  boxShadow:
    "0 10px 30px rgba(79,70,229,0.4)",
};

const statCard2 = {

  padding: "28px",

  borderRadius: "28px",

  background:
    "linear-gradient(135deg,#f59e0b,#f97316)",

  color: "white",

  display: "flex",

  flexDirection: "column",

  gap: "12px",

  boxShadow:
    "0 10px 30px rgba(245,158,11,0.4)",
};

const statCard3 = {

  padding: "28px",

  borderRadius: "28px",

  background:
    "linear-gradient(135deg,#06b6d4,#3b82f6)",

  color: "white",

  display: "flex",

  flexDirection: "column",

  gap: "12px",

  boxShadow:
    "0 10px 30px rgba(6,182,212,0.4)",
};

const statCard4 = {

  padding: "28px",

  borderRadius: "28px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "white",

  display: "flex",

  flexDirection: "column",

  gap: "12px",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.4)",
};

export default Dashboard;