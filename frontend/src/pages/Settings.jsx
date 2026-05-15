import Sidebar from "../components/Sidebar";

import { useState } from "react";

function Settings() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
          Settings ⚙️
        </h1>

        <div
          style={{
            maxWidth: "500px",

            padding: "30px",

            borderRadius: "25px",

            background:
              "rgba(255,255,255,0.08)",

            backdropFilter:
              "blur(12px)",

            border:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >

          <div
            style={{
              width: "90px",

              height: "90px",

              borderRadius: "50%",

              background:
                "linear-gradient(90deg,#6C63FF,#3399FF)",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              fontSize: "38px",

              fontWeight: "bold",

              marginBottom: "25px",
            }}
          >
            {user?.name?.[0]}
          </div>

          <h2>
            {user?.name}
          </h2>

          <p
            style={{
              color: "#cccccc",

              marginTop: "10px",
            }}
          >
            {user?.email}
          </p>

          <p
            style={{
              marginTop: "20px",

              color:
                user?.role ===
                "admin"
                  ? "#00ff99"
                  : "#3399ff",

              fontWeight: "bold",
            }}
          >
            Role: {user?.role}
          </p>

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              window.location.href =
                "/";
            }}

            style={{
              marginTop: "30px",

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

      </div>

    </div>
  );
}

export default Settings;