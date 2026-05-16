// COMPLETE MODERN LOGIN.JSX 🚀

import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  ShieldCheck,
  Sparkles,
  Rocket,
} from "lucide-react";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      if (
        !email ||
        !password
      ) {

        return setMessage(
          "Fill all fields"
        );
      }

      try {

        setLoading(true);

        const res =
          await axios.post(

            "https://helpful-light-production-003e.up.railway.app/api/auth/login",

            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",

          JSON.stringify(
            res.data.user
          )
        );

        setMessage(
          "Login Successful"
        );

        setTimeout(() => {

          navigate(
            "/dashboard"
          );

        }, 1200);

      } catch (error) {

        setMessage(

          error.response?.data
            ?.message ||

          "Login Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div
      style={{
        height: "100vh",

        overflow: "hidden",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827,#1e1b4b)",

        position: "relative",

        fontFamily:
          "Arial",

        padding: "20px",
      }}
    >

      {/* ANIMATED BLOBS */}

      <div style={blob1}></div>

      <div style={blob2}></div>

      <div style={blob3}></div>

      {/* TOAST MESSAGE */}

      {message && (

        <div style={toastStyle}>
          {message}
        </div>

      )}

      {/* CARD */}

      <div
        style={mainCard}
      >
      

        {/* LEFT */}

        <div
          style={leftPanel}
        >

          <div
            style={{
              display: "flex",

              alignItems:
                "center",

              gap: "12px",

              marginBottom:
                "25px",
            }}
          >

            <Rocket size={42} />

            <h1
              style={logoStyle}
            >
              TaskFlow
            </h1>

          </div>

          <p
            style={descriptionStyle}
          >
            Advanced team
            management platform
            for project tracking,
            analytics and smart
            productivity.
          </p>

          <div
            style={featureStyle}
          >
            <ShieldCheck />
            Secure Authentication
          </div>

          <div
            style={featureStyle}
          >
            <Sparkles />
            Real-Time Dashboard
          </div>

        </div>

        {/* RIGHT */}

        <form
          onSubmit={
            handleLogin
          }

          style={rightPanel}
        >

          <h2
            style={headingStyle}
          >
            Sign In
          </h2>

          <p
            style={subText}
          >
            Continue to your workspace
          </p>

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <button
            type="submit"

            style={buttonStyle}
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          <p
            style={{
              marginTop: "25px",

              textAlign:
                "center",

              color:
                "#94a3b8",
            }}
          >
            Don’t have account?

            <span
              onClick={() =>
                navigate(
                  "/register"
                )
              }

              style={{
                color:
                  "#38bdf8",

                cursor:
                  "pointer",

                marginLeft:
                  "8px",

                fontWeight:
                  "bold",
              }}
            >
              Register
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

/* STYLES */

const blob1 = {

  position: "absolute",

  width: "420px",

  height: "420px",

  background:
    "#4f46e5",

  borderRadius: "50%",

  filter:
    "blur(160px)",

  top: "-120px",

  left: "-100px",

  animation:
    "float 8s ease-in-out infinite",
};

const blob2 = {

  position: "absolute",

  width: "350px",

  height: "350px",

  background:
    "#06b6d4",

  borderRadius: "50%",

  filter:
    "blur(160px)",

  bottom: "-100px",

  right: "-100px",

  animation:
    "float 10s ease-in-out infinite",
};

const blob3 = {

  position: "absolute",

  width: "300px",

  height: "300px",

  background:
    "#9333ea",

  borderRadius: "50%",

  filter:
    "blur(160px)",

  top: "40%",

  left: "40%",

  animation:
    "float 12s ease-in-out infinite",
};

const mainCard = {
  overflow: "hidden",

  width:

    window.innerWidth < 900

      ? "95%"

      : "1050px",

maxHeight: "100vh",

  display: "flex",

  flexDirection:

    window.innerWidth < 900

      ? "column"

      : "row",

  overflow: "hidden",

  borderRadius: "40px",

  background:
    "rgba(15,23,42,0.72)",

  backdropFilter:
    "blur(20px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.5)",

  zIndex: 10,
};

const leftPanel = {

  flex: 1,

 padding:

window.innerWidth < 768

? "28px"

: "45px", 

  color: "white",

  display: "flex",

  flexDirection: "column",

  justifyContent:
    "center",

  background:
    "linear-gradient(135deg,#4f46e5,#06b6d4)",
};

const rightPanel = {

  flex: 1,

  padding: "60px",

  display: "flex",

  flexDirection: "column",

  justifyContent:
    "center",

  overflowY: "auto",

  background:
    "rgba(255,255,255,0.03)",
};

const logoStyle = {

  fontSize: "44px",

  fontWeight: "900",
};

const descriptionStyle = {

  lineHeight: "1.9",

  marginBottom: "35px",

  opacity: 0.9,

  fontSize: "17px",
};

const featureStyle = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "16px",

  borderRadius: "18px",

  marginBottom: "18px",

  background:
    "rgba(255,255,255,0.14)",
};

const headingStyle = {

  color: "white",

  fontSize: "42px",

  marginBottom: "10px",

  fontWeight: "800",
};

const subText = {

  color: "#94a3b8",

  marginBottom: "35px",
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

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  outline: "none",

  fontSize: "15px",
};

const buttonStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#4f46e5,#06b6d4)",

  color: "white",

  fontWeight: "bold",

  fontSize: "16px",

  cursor: "pointer",

  letterSpacing: "1px",

  textTransform:
    "uppercase",
};

const toastStyle = {

  position: "absolute",

  top: "30px",

  right: "30px",

  background:
    "rgba(15,23,42,0.9)",

  color: "white",

  padding: "16px 24px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  zIndex: 1000,
};

export default Login;