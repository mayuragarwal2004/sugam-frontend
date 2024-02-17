import React, { useState } from "react";
import PhoneNumber from "../PhoneNumber";
import { useAuth } from "../context/auth/AuthState";
import Select from "react-select";
import roles from "./Roles.json";
import Alert from "@mui/material/Alert";

const AddRole = () => {
  const [num, setnum] = useState({ phone: "91", valid: false });
  const [roleSelect, setRoleSelect] = useState();
  const [alert, setalert] = useState();
  const [currentRole, setCurrentRole] = useState();
  const { currentUser } = useAuth();
  function handleAddRole() {
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
  function handleNumNewChange(val) {
    setnum(val);
  }

  currentUser?.getIdTokenResult()
    .then((idTokenResult) => setCurrentRole(idTokenResult.claims.role));

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <div>
        {setCurrentRole !== {} &&
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="name"
          options={roles[currentRole]}
          onChange={(val) => setRoleSelect(val.value)}
        />}
      </div>
      <div>
        <PhoneNumber value={num} setValue={handleNumNewChange} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button typeof="button" id="addrole-submitbtn" onClick={handleAddRole}>
          Add
        </button>
      </div>
      {alert && (
        <Alert variant="filled" severity={alert.ok ? "success" : "error"}>
          {alert.info}
        </Alert>
      )}
    </div>
  );
};

export default AddRole;
