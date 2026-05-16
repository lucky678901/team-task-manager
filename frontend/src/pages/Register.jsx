import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
  Rocket,
} from "lucide-react";

function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("member");

  const [adminKey, setAdminKey] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (
        !name ||
        !email ||
        !password
      ) {

        return alert(
          "All fields required"
        );
      }

      if (
        !email.includes("@")
      ) {

        return alert(
          "Invalid email"
        );
      }

      if (
        password.length < 6
      ) {

        return alert(
          "Password must be at least 6 characters"
        );
      }

      if (
        role === "admin"
        &&
        !adminKey
      ) {

        return alert(
          "Admin secret key required"
        );
      }

      try {

        setLoading(true);

        await axios.post(

          "https://helpful-light-production-003e.up.railway.app/api/auth/register",

          {
            name,

            email,

            password,

            role,

            adminKey,
          }
        );

        alert(
          "Registration Successful 🚀"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Registration Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div
      style={{
        height: "100%",

overflow: "hidden",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        background:
          "radial-gradient(circle at top left,#1e3a8a,#050816,#000000)",

        overflow: "hidden",

        position: "relative",

        fontFamily:
          "Arial",

        padding: "20px",
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

          opacity: 0.4,
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

          opacity: 0.4,
        }}
      />

      {/* MAIN CARD */}

      <div
        style={{

          width:

            window.innerWidth < 900

              ? "95%"

              : "1100px",

          minHeight: "650px",

          display: "flex",

          flexDirection:

            window.innerWidth < 900

              ? "column"

              : "row",

          borderRadius: "40px",

          overflow: "hidden",

          background:
            "rgba(255,255,255,0.06)",

          backdropFilter:
            "blur(20px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          boxShadow:
            "0 15px 50px rgba(0,0,0,0.5)",

          zIndex: 10,
        }}
      >

        {/* LEFT SIDE */}

        <div
          style={{
            flex: 1,

            padding:

              window.innerWidth < 768

                ? "35px"

                : "60px",

            display: "flex",

            flexDirection:
              "column",

            justifyContent:
              "center",

            color: "white",

            background:
              "linear-gradient(135deg,#6C63FF,#00c6ff)",
          }}
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
              style={{
                fontSize:
                  "44px",

                fontWeight:
                  "800",
              }}
            >
              TaskFlow
            </h1>

          </div>

          <p
            style={{
              fontSize: "18px",

              lineHeight:
                "1.8",

              opacity: 0.9,

              marginBottom:
                "40px",
            }}
          >
            Build smarter teams,
            assign projects,
            manage tasks,
            and track progress
            using an advanced
            productivity platform.
          </p>

          {/* FEATURES */}

          <div
            style={{
              display: "flex",

              flexDirection:
                "column",

              gap: "20px",
            }}
          >

            <div style={featureStyle}>
              <ShieldCheck />
              Secure Team Access
            </div>

            <div style={featureStyle}>
              <Sparkles />
              Modern SaaS Dashboard
            </div>

            <div style={featureStyle}>
              <Rocket />
              Faster Productivity
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <form
          onSubmit={
            handleRegister
          }

          style={{
            flex: 1,

            padding:

              window.innerWidth < 768

                ? "35px"

                : "60px",

            display: "flex",

            flexDirection:
              "column",

            justifyContent:
              "center",

            background:
              "rgba(255,255,255,0.03)",
          }}
        >

          <h2
            style={{
              color: "white",

              fontSize:
                "38px",

              marginBottom:
                "12px",
            }}
          >
            Create Account 🚀
          </h2>

          <p
            style={{
              color: "#cccccc",

              marginBottom:
                "35px",
            }}
          >
            Register to continue
          </p>

          {/* NAME */}

          <div style={inputWrapper}>

            <User
              size={20}
              color="#00c6ff"
            />

            <input
              type="text"

              placeholder="Enter Name"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              style={inputStyle}
            />

          </div>

          {/* EMAIL */}

          <div style={inputWrapper}>

            <Mail
              size={20}
              color="#00c6ff"
            />

            <input
              type="email"

              placeholder="Enter Email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              style={inputStyle}
            />

          </div>

          {/* PASSWORD */}

          <div style={inputWrapper}>

            <Lock
              size={20}
              color="#00c6ff"
            />

            <input
              type="password"

              placeholder="Enter Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              style={inputStyle}
            />

          </div>

          {/* ROLE */}

          <select

            value={role}

            onChange={(e) =>
              setRole(
                e.target.value
              )
            }

            style={selectStyle}
          >

            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* ADMIN KEY */}

          {role === "admin" && (

            <div style={inputWrapper}>

              <ShieldCheck
                size={20}
                color="#00c6ff"
              />

              <input
                type="password"

                placeholder="Enter Admin Secret Key"

                value={adminKey}

                onChange={(e) =>
                  setAdminKey(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

            </div>

          )}

          {/* BUTTON */}

          <button
            type="submit"

            style={buttonStyle}
          >
            {loading
              ? "Loading..."
              : "Register"}
          </button>

          {/* LOGIN */}

          <p
            style={{
              marginTop: "25px",

              textAlign:
                "center",

              color:
                "#cccccc",
            }}
          >
            Already have an account?

            <span
              onClick={() =>
                navigate("/")
              }

              style={{
                color:
                  "#00c6ff",

                cursor:
                  "pointer",

                marginLeft:
                  "8px",

                fontWeight:
                  "bold",
              }}
            >
              Login
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

const inputWrapper = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "0 16px",

  marginBottom: "22px",

  borderRadius: "18px",

  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const inputStyle = {

  flex: 1,

  padding: "18px 0",

  border: "none",

  outline: "none",

  background:
    "transparent",

  color: "white",

  fontSize: "15px",
};

const selectStyle = {

  width: "100%",

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

  transition: "0.3s",

  boxShadow:
    "0 6px 24px rgba(108,99,255,0.4)",
};

const featureStyle = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "16px",

  borderRadius: "18px",

  background:
    "rgba(255,255,255,0.12)",

  fontWeight: "600",

  backdropFilter:
    "blur(10px)",
};

export default Register;