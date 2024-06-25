import React, { useEffect, useState } from "react";
// import PhoneNumber from "../PhoneNumber";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Root = () => {
  const [inputData, setInputData] = useState({
    username: {
      value: "",
      error: false,
      helperText: "",
    },
    email: {
      value: "",
      error: false,
      helperText: "",
    },
    password: {
      value: "",
      error: false,
      helperText: "",
    },
  });
  function handleAddRole() {
    // return;
    if (inputData.username && inputData.email && inputData.password) {
      const postData = {
        username: inputData.username.value,
        email: inputData.email.value,
        password: inputData.password.value,
        phone: 123456789,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };
      fetch("/java/api/rootspace/addManager", requestOptions).then(
        (response) => {
          if (response.ok) {
          }
        }
      );
    } else {
      console.log("invalid");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "5px",
        width: "fit-content",
        margin: "20px auto",
      }}
    >
      {/* <PhoneNumber value={num} setValue={handleNumNewChange} /> */}
      <TextField
        error={inputData.username.error}
        id="outlined-username-input"
        label="Manager Username"
        value={inputData.username.value}
        helperText={inputData.username.helperText}
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        onChange={(e) => {
          setInputData({
            ...inputData,
            username: {
              value: e.target.value,
              error: false,
              helperText: "",
            },
          });
        }}
      />
      <TextField
        error={inputData.email.error}
        id="outlined-email-input"
        label="Manager Email"
        value={inputData.email.value}
        helperText={inputData.email.helperText}
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        onChange={(e) => {
          setInputData({
            ...inputData,
            email: {
              value: e.target.value,
              error: false,
              helperText: "",
            },
          });
        }}
      />
      <TextField
        error={inputData.password.error}
        id="outlined-password-input"
        label="Manager Password"
        type="password"
        autocomplete="new-password"
        inputProps={{ autocomplete: "new-password" }}
        onChange={(e) => {
          setInputData({
            ...inputData,
            password: {
              value: e.target.value,
              error: false,
              helperText: "",
            },
          });
        }}
      />
      <button typeof="button" id="addrole-submitbtn" onClick={handleAddRole}>
        Add
      </button>
    </div>
  );
};

export default Root;
