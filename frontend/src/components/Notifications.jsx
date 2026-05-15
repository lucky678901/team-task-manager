import {
  FaBell,
} from "react-icons/fa";

import { useState } from "react";

function Notifications() {

  const [open, setOpen] =
    useState(false);

  const notifications = [

    "✅ Task completed",

    "🚀 New project created",

    "📌 New task assigned",

    "⚡ Dashboard updated",
  ];

  return (

    <div
      style={{
        position: "relative",
      }}
    >

      {/* BELL */}

      <button
        onClick={() =>
          setOpen(!open)
        }

        style={{
          background:
            "rgba(255,255,255,0.08)",

          border: "none",

          color: "white",

          padding: "14px",

          borderRadius: "14px",

          cursor: "pointer",

          position: "relative",
        }}
      >

        <FaBell size={20} />

        {/* COUNT */}

        <span
          style={{
            position: "absolute",

            top: "-6px",

            right: "-6px",

            background: "#ff4444",

            borderRadius: "50%",

            width: "20px",

            height: "20px",

            fontSize: "12px",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",
          }}
        >
          {notifications.length}
        </span>

      </button>

      {/* PANEL */}

      {open && (

        <div
          style={{
            position: "absolute",

            right: 0,

            top: "60px",

            width: "320px",

            background:
              "rgba(20,20,20,0.95)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            borderRadius: "20px",

            padding: "20px",

            zIndex: 1000,

            backdropFilter:
              "blur(12px)",
          }}
        >

          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Notifications 🔔
          </h3>

          {notifications.map(
            (item, index) => (

              <div
                key={index}

                style={{
                  padding: "14px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(255,255,255,0.05)",

                  marginBottom:
                    "12px",
                }}
              >

                {item}

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default Notifications;