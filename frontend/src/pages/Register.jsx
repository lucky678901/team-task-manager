import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

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

  const handleRegister =
    async (e) => {

      e.preventDefault();

      // VALIDATIONS

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

      try {

        await axios.post(

          "http://localhost:5000/api/auth/register",

          {
            name,
            email,
            password,
            role,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Registration Failed"
        );
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        background:
          "linear-gradient(135deg,#000000,#111111,#1a1a1a)",

        fontFamily: "Arial",
      }}
    >

      <form
        onSubmit={
          handleRegister
        }

        style={{
          width: "420px",

          padding: "40px",

          borderRadius: "25px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(14px)",

          border:
            "1px solid rgba(255,255,255,0.1)",

          color: "white",

          boxShadow:
            "0 0 30px rgba(0,0,0,0.5)",
        }}
      >

        <h1
          style={{
            textAlign:
              "center",

            marginBottom:
              "35px",

            fontSize: "38px",
          }}
        >
          Register 🚀
        </h1>

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

        <select

          value={role}

          onChange={(e) =>
            setRole(
              e.target.value
            )
          }

          style={inputStyle}
        >

          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          type="submit"

          style={buttonStyle}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "20px",

            textAlign:
              "center",

            color: "#cccccc",
          }}
        >
          Already have account?

          <span
            onClick={() =>
              navigate("/")
            }

            style={{
              color:
                "#3399ff",

              cursor:
                "pointer",

              marginLeft:
                "6px",
            }}
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "20px",

  borderRadius: "14px",

  border: "none",

  outline: "none",

  background:
    "rgba(255,255,255,0.08)",

  color: "white",

  fontSize: "15px",
};

const buttonStyle = {

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#6C63FF,#3399FF)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "16px",
};

export default Register;