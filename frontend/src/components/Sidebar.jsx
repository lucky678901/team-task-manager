import {
  FaHome,
  FaTasks,
  FaUsers,
  FaCog,
  FaBars,
  FaColumns,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar({
  isOpen,
  setIsOpen,
}) {
  return (
    <>
      {/* TOGGLE BUTTON */}

      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        style={{
          position: "fixed",

          top: "20px",

          left: isOpen
            ? "260px"
            : "20px",

          zIndex: 1000,

          padding: "12px",

          border: "none",

          borderRadius: "12px",

          cursor: "pointer",

          background:
            "linear-gradient(90deg,#6C63FF,#3399FF)",

          color: "white",

          transition: "0.3s",
        }}
      >
        <FaBars />
      </button>

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",

          background:
            "rgba(255,255,255,0.06)",

          backdropFilter: "blur(14px)",

          height: "100vh",

          padding: "30px",

          borderRight:
            "1px solid rgba(255,255,255,0.1)",

          position: "fixed",

          left: isOpen
            ? "0"
            : "-260px",

          top: 0,

          color: "white",

          transition: "0.4s",

          zIndex: 999,
        }}
      >
        <h1
          style={{
            marginBottom: "50px",

            fontSize: "28px",
          }}
        >
          TaskFlow 
        </h1>

        <nav
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "20px",
          }}
        >
          <Link
            to="/dashboard"
            style={linkStyle}
          >
            <FaHome />

            Dashboard
          </Link>

          <Link
            to="/projects"
            style={linkStyle}
          >
            <FaTasks />

            Projects
          </Link>

          <Link
            to="/team"
            style={linkStyle}
          >
            <FaUsers />

            Team
          </Link>

          <Link
            to="/kanban"
            style={linkStyle}
          >
            <FaColumns />

            Kanban
          </Link>

          <Link
            to="/settings"
            style={linkStyle}
          >
            <FaCog />

            Settings
          </Link>
        </nav>
      </div>
    </>
  );
}

const linkStyle = {
  color: "white",

  textDecoration: "none",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  fontSize: "18px",

  padding: "14px",

  borderRadius: "14px",

  background:
    "rgba(255,255,255,0.05)",

  transition: "0.3s",
};

export default Sidebar;