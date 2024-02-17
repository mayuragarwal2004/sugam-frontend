import React, { useEffect, useState } from "react";
import "./Login.css";
import Alert from "@mui/material/Alert";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleRegisterSubmit = () => {
    // Add logic here to handle the register button click
    console.log("Register button clicked");
    fetch(
      `/sugam/api/register?user=${username}&pass=${password}&username=${"abc"}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            console.log(new TextDecoder().decode(value));

            if (value) {
              setAlertData({
                open: true,
                message: "registration successful.",
                severity: "info",
              });
            } else {
              setAlertData({
                open: true,
                message: "registration failed.",
                severity: "error",
              });
            }
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Add logic here to handle form submission
    console.log("Form submitted");
    fetch(`/sugam/api/authenticate?user=${username}&pass=${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            console.log(new TextDecoder().decode(value));
            if (value) {
              setAlertData({
                open: true,
                message: "login successful.",
                severity: "info",
              });
            } else {
              setAlertData({
                open: true,
                message: "login failed.",
                severity: "error",
              });
            }
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  useEffect(() => {
    if(alertData.open) {
      setTimeout(() => {
        setAlertData({ open: false, message: "", severity: "info" });
      }, 5000);
    }
  }
  , [alertData.open]);

  return (
    <div className="bodylogin">
      <div className="login-container">
        <svg
          className="trucksvg"
          fill="#0ca074e1"
          version="1.1"
          id="Layer_1"
          width="171px"
          height="171px"
          viewBox="-25.6 -25.6 307.20 307.20"
          enableBackground="new 0 0 256 160"
          xmlSpace="preserve"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="5.632"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M252,113.002h-5v-22c0-7.4-5.52-13-13-13h-24c-0.5,0-1.1-0.27-1.44-0.61l-37.4-36.4c-1.68-1.68-3.72-2.91-6.16-2.99h-27v92 h40c0.92,0,1.83-1.16,2-2c2.52-14.46,14.83-25.43,30.04-25.43c15.22,0,27.82,11.01,30.34,25.47c0.17,0.92,1.7,1.96,2.62,1.96h2 c4.79,0,9-4.31,9-9.02v-6.22C254,113.832,253.01,113.002,252,113.002z M191,78.002h-41c-1.01,0-2-0.99-2-2l-0.04-25.85 c0-1.01,1.03-2.15,2.04-2.15h13c0.5,0,1.52,0.55,1.94,0.89L192,75.002C193.01,76.262,192.6,78.002,191,78.002z M2,2.002v119.44 c0,4.48,3.52,8.56,8,8.56h22c0.92,0,1.83-1.16,2-2c2.52-14.46,15.33-24.44,30.54-24.44c15.21,0,27.82,10.02,30.34,24.48 c0.17,0.92,1.2,1.96,2.12,1.96h33v-128H2z M81.53,70.242c-9.44,9.43-23.09,11.31-32.05,5.02c-3.62,3.54-7.7,10.97-7.7,10.97 l-6.22-0.74c11.24-16.05,22-27.15,38.39-38.8c-0.7,0.32-23.18,10.69-30.1,22.41c-5.08-8.97-2.87-21.55,6.03-30.45 c5.75-5.75,15.59-7.22,26.16-8.16c11.24-0.94,18.4-5.49,18.4-5.49S91.9,59.932,81.53,70.242z M210.04,110.472 c-12.77,0-23.11,10.34-23.11,23.12c0,12.77,10.34,23.11,23.11,23.11c12.78,0,23.12-10.34,23.12-23.11 C233.16,120.812,222.82,110.472,210.04,110.472z M210.04,142.442c-4.85,0-8.85-4-8.85-8.85c0-4.86,4-8.86,8.85-8.86 c4.86,0,8.86,4,8.86,8.86C218.9,138.442,214.9,142.442,210.04,142.442z M64.54,111.462c-12.78,0-23.11,10.34-23.11,23.11 c0,12.78,10.33,23.11,23.11,23.11c12.77,0,23.11-10.33,23.11-23.11C87.65,121.802,77.31,111.462,64.54,111.462z M64.54,143.422 c-4.85,0-8.85-4-8.85-8.85s4-8.85,8.85-8.85c4.85,0,8.85,4,8.85,8.85S69.39,143.422,64.54,143.422z"></path>{" "}
          </g>
        </svg>

        <div className="login-form">
          <form>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="button-container">
              <button
                type="button"
                className="register-button"
                onClick={handleRegisterSubmit}
              >
                Register
              </button>
              <button
                type="submit"
                className="login-button"
                onClick={handleLoginSubmit}
              >
                Login
              </button>
            </div>
          </form>
          {alertData.open && (
            <Alert severity={alertData.severity} sx={{ marginTop: "10px" }}>
              {alertData.message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
