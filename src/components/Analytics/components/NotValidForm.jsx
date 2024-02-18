import React, { useState } from "react";
import Select from "react-select";
import { useAuth } from "../../context/auth/AuthState";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../base";

const options = [
  { value: "Scam reports", label: "Scam reports" },
  { value: "Garbage not found", label: "Garbage not found" },
  {
    value: "Resolution already in progress",
    label: "Resolution already in progress",
  },
  { value: "Perception invalid", label: "Perception invalid" },
];

const NotValidForm = (props) => {
  const { data, activeMarker } = props;
  const [value, setvalue] = useState(null);
  const { currentUser, currentUserRole } = useAuth();

  async function handleSubmit() {
    fetch(`/sugam/user/markInvalid?id=${data[activeMarker].id}&msg=${value}`)
      .then((response) => {
        console.log(response);
      })
      .then(console.log("submitted"));
  }
  return (
    <>
      <div>Name: {currentUser.username}</div>
      <div>Role: {currentUserRole}</div>
      <div>Reason for non-valid Complaint</div>
      <div className="not-valid-form-select">
        <Select
          className="basic-single "
          classNamePrefix="select"
          name="name"
          options={options}
          value={value}
          onChange={(val) => setvalue(val.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit} id="submitbtn">
          Submit
        </button>
      </div>
    </>
  );
};

export default NotValidForm;
