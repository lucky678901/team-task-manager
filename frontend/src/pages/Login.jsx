import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(

            "http://localhost:5000/api/auth/login",

            {
              email,
              password,
            }
          );

        // SAVE TOKEN

        localStorage.setItem(

          "token",

          res.data.token
        );

        // SAVE USER

        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Login Failed"
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
          handleLogin
        }

        style={{
          width: "400px",

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
          Login 
        </h1>

        <input
          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          required

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

          required

          style={inputStyle}
        />

        <button
          type="submit"

          style={buttonStyle}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",

            textAlign:
              "center",

            color: "#cccccc",
          }}
        >
          Don’t have an account?

          <span
            onClick={() =>
              navigate(
                "/register"
              )
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
            Register
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

export default Login;