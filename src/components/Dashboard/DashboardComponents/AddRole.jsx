import React, { useState } from "react";
// import PhoneNumber from "../PhoneNumber";
import { useAuth } from "../../context/auth/AuthState";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRole = () => {
  const [num, setnum] = useState({ phone: "91", valid: false });
  const [roleSelect, setRoleSelect] = useState();
  const [alert, setalert] = useState();
  const [currentRole, setCurrentRole] = useState();
  const { currentUser } = useAuth();
  const [inputData, setInputData] = useState({
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

  // worker list with sample data
  const [workerList, setWorkerList] = useState([
    {
      email: "jhon@email.com",
      role: "worker",
      complaintsSolved: 10,
      checked: false,
    },
    {
      email: "jhon@email.com",
      role: "worker",
      complaintsSolved: 10,
      checked: false,
    },
    {
      email: "jhon@email.com",
      role: "worker",
      complaintsSolved: 10,
      checked: false,
    },
    {
      email: "jhon@email.com",
      role: "worker",
      complaintsSolved: 10,
      checked: false,
    },
    {
      email: "jhon@email.com",
      role: "worker",
      complaintsSolved: 10,
      checked: false,
    },
  ]);

  console.log({ workerList });

  const handleCheckBoxChange = (event, i) => {
    if (i === "All Check") {
      console.log("All Check");
      const newWorkerList = [...workerList];
      newWorkerList.forEach((worker) => {
        worker.checked = event.target.checked;
      });
      setWorkerList(newWorkerList);
      return;
    }

    const newWorkerList = [...workerList];
    newWorkerList[i].checked = event.target.checked;
    setWorkerList(newWorkerList);
  };

  function handleAddRole() {
    return;
    if (num.valid && roleSelect && currentUser) {
      const postData = {
        currentUser: currentUser.uid,
        phoneNumber: num.phone,
        role: roleSelect,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };
      fetch("/api", requestOptions)
        .then((response) => response.json())
        .then((data) => setalert(data));
    } else {
      console.log("invalid");
    }
  }

  return (
    <>
      <div style={{ maxWidth: "300px", margin: "auto" }}>
        {/* <div>
        {currentRole && (
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="name"
            options={roles[currentRole]}
            onChange={(val) => setRoleSelect(val.value)}
          />
        )}
      </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "5px",
          }}
        >
          {/* <PhoneNumber value={num} setValue={handleNumNewChange} /> */}
          <TextField
            error={inputData.email.error}
            id="outlined-email-input"
            label="Worker Email"
            value={inputData.email.value}
            helperText={inputData.email.helperText}
            autoComplete="off"
            inputProps={{ autocomplete: "off" }}
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
            label="Worker Password"
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
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            typeof="button"
            id="addrole-submitbtn"
            onClick={handleAddRole}
          >
            Add
          </button>
        </div>
        {alert && (
          <Alert variant="filled" severity={alert.ok ? "success" : "error"}>
            {alert.info}
          </Alert>
        )}
        {/* worker table */}
      </div>
      <div className="worker-table">
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={workerList.every((worker) => worker.checked)}
                  onChange={(e) => handleCheckBoxChange(e, "All Check")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>Complaints Solved</th>
              <th>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {workerList.map((worker, i) => (
              <tr>
                <td>
                  <Checkbox
                    checked={worker.checked}
                    onChange={(e) => handleCheckBoxChange(e, i)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
                <td>{worker.email}</td>
                <td>{worker.role}</td>
                <td>{worker.complaintsSolved}</td>
                <td>
                  <IconButton aria-label="delete">
                    <DeleteIcon style={{ margin: "0" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddRole;
