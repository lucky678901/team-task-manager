import {
  Home,
  FolderKanban,
  Users,
  LayoutDashboard,
  Settings,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar({
  isOpen,
  setIsOpen,
}) {

  return (

    <div
      style={{
       width:

window.innerWidth < 768

? isOpen
  ? "220px"
  : "0px"

: isOpen
? "250px"
: "80px",

        height: "100vh",

        background:
          "linear-gradient(180deg,#000000,#111111,#1a1a1a)",

        color: "white",

        position: "fixed",

        left: 0,

        top: 0,

        transition: "0.4s",

        overflow: "hidden",

        paddingTop: "25px",

        borderRight:
          "1px solid rgba(255,255,255,0.08)",

        zIndex: 999,
      }}
    >

      {/* TOGGLE */}

      <div
        style={{
          display: "flex",

          justifyContent:
            isOpen
              ? "space-between"
              : "center",

          alignItems: "center",

          padding:
            "0 20px",

          marginBottom: "40px",
        }}
      >

        {isOpen && (

          <h1
            style={{
              fontSize: "32px",

              fontWeight:
                "bold",
            }}
          >
            TaskFlow 🚀
          </h1>

        )}

        <button
          onClick={() =>
            setIsOpen(
              !isOpen
            )
          }

          style={{
            background:
              "linear-gradient(90deg,#6C63FF,#3399FF)",

            border: "none",

            padding: "12px",

            borderRadius:
              "14px",

            color: "white",

            cursor: "pointer",
          }}
        >
          <Menu size={22} />
        </button>

      </div>

      {/* MENU */}

      <div
        style={{
          display: "flex",

          flexDirection:
            "column",

          gap: "18px",

          padding: "0 15px",
        }}
      >

        <SidebarItem
          icon={<Home />}
          text="Dashboard"
          isOpen={isOpen}
          link="/dashboard"
        />

        <SidebarItem
          icon={<FolderKanban />}
          text="Projects"
          isOpen={isOpen}
          link="/projects"
        />

        <SidebarItem
          icon={<Users />}
          text="Team"
          isOpen={isOpen}
          link="/team"
        />

        <SidebarItem
          icon={
            <LayoutDashboard />
          }
          text="Kanban"
          isOpen={isOpen}
          link="/kanban"
        />

        <SidebarItem
          icon={<Settings />}
          text="Settings"
          isOpen={isOpen}
          link="/settings"
        />

      </div>

    </div>
  );
}

function SidebarItem({
  icon,
  text,
  isOpen,
  link,
}) {

  return (

    <Link
      to={link}

      style={{
        textDecoration:
          "none",

        color: "white",
      }}
    >

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "16px",

          padding:
            "16px 18px",

          borderRadius: "18px",

          cursor: "pointer",

          background:
            "rgba(255,255,255,0.05)",

          transition: "0.3s",
        }}
      >

        {icon}

        {isOpen && (

          <span
            style={{
              fontSize: "20px",

              fontWeight:
                "500",
            }}
          >
            {text}
          </span>

        )}

      </div>

    </Link>
  );
}

export default Sidebar;