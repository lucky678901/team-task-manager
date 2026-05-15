import Sidebar from "../components/Sidebar";

import { useState } from "react";

function Kanban() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const tasks = [

    {
      title: "Frontend UI",

      status: "pending",
    },

    {
      title: "Backend API",

      status: "in-progress",
    },

    {
      title: "Deploy App",

      status: "completed",
    },
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

        <h1
          style={{
            fontSize: "42px",

            marginBottom: "40px",
          }}
        >
          Kanban Board 🚀
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(3,1fr)",

            gap: "25px",
          }}
        >

          {/* PENDING */}

          <Column
            title="Pending"

            color="#ffcc00"

            tasks={tasks.filter(
              (task) =>
                task.status ===
                "pending"
            )}
          />

          {/* IN PROGRESS */}

          <Column
            title="In Progress"

            color="#3399ff"

            tasks={tasks.filter(
              (task) =>
                task.status ===
                "in-progress"
            )}
          />

          {/* COMPLETED */}

          <Column
            title="Completed"

            color="#00ff99"

            tasks={tasks.filter(
              (task) =>
                task.status ===
                "completed"
            )}
          />

        </div>

      </div>

    </div>
  );
}

function Column({
  title,
  color,
  tasks,
}) {

  return (

    <div
      style={{
        padding: "20px",

        borderRadius: "25px",

        background:
          "rgba(255,255,255,0.06)",

        minHeight: "500px",
      }}
    >

      <h2
        style={{
          color,

          marginBottom: "25px",
        }}
      >
        {title}
      </h2>

      {tasks.map(
        (task, index) => (

          <div
            key={index}

            style={{
              padding: "18px",

              borderRadius: "18px",

              background:
                "rgba(255,255,255,0.08)",

              marginBottom: "15px",
            }}
          >

            {task.title}

          </div>

        )
      )}

    </div>
  );
}

export default Kanban;