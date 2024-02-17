import React, { useState } from "react";
import Select from "react-select";
import { useAuth } from "../../context/auth/AuthState";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../base";

const options = [
  { value: "Not a dump", label: "Not a dump" },
  { value: "Not a dump", label: "Not a dump" },
  { value: "Not a dump", label: "Not a dump" },
];

const NotValidForm = (props) => {
  const { data, activeMarker } = props;
  const [value, setvalue] = useState(null);
  const { currentUser, currentUserRole } = useAuth();
  async function handleSubmit() {
    console.log(data[activeMarker].docID);
    await updateDoc(doc(db, "Complaints", data[activeMarker].docID), {
      notValid: [
        {
          reason: value,
          reportedByRole: currentUserRole,
          reportedByName: currentUser.displayName,
          reportedByUID: currentUser.uid,
        },
      ],
    }).then(val=>console.log("submitted"))
  }
  return (
    <>
      <div>Name: {currentUser.displayName}</div>
      <div>Role: {currentUserRole}</div>
      <div>Reason for non-valid Complaint</div>
      <div className="not-valid-form-select">
        <Select
          className="basic-single "
          classNamePrefix="select"
          name="name"
          options={options}
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
