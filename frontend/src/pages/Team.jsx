import Sidebar from "../components/Sidebar";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

function Team() {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/users",

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
          Team Members 👨‍💻
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",

            gap: "25px",
          }}
        >

          {users.map(
            (user) => (

              <div
                key={user._id}

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

                {/* AVATAR */}

                <div
                  style={{
                    width: "70px",

                    height: "70px",

                    borderRadius: "50%",

                    background:
                      "linear-gradient(90deg,#6C63FF,#3399FF)",

                    display: "flex",

                    alignItems: "center",

                    justifyContent:
                      "center",

                    fontSize: "28px",

                    fontWeight: "bold",

                    marginBottom: "20px",
                  }}
                >
                  {user.name[0]}
                </div>

                <h2>
                  {user.name}
                </h2>

                <p
                  style={{
                    color: "#cccccc",

                    marginTop: "10px",
                  }}
                >
                  {user.email}
                </p>

                <div
                  style={{
                    marginTop: "18px",

                    display:
                      "inline-block",

                    padding:
                      "10px 16px",

                    borderRadius:
                      "12px",

                    background:
                      user.role ===
                      "admin"

                        ? "rgba(0,255,153,0.15)"

                        : "rgba(51,153,255,0.15)",

                    color:
                      user.role ===
                      "admin"

                        ? "#00ff99"

                        : "#3399ff",

                    fontWeight:
                      "bold",
                  }}
                >
                  {user.role}
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Team;