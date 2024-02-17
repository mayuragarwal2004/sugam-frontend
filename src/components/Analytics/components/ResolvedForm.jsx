import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthState";
import ResolvedFormImageInput from "./ResolvedFormImageInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../base";

const ResolvedForm = (props) => {
  const { data, activeMarker } = props;
  const [img, setimg] = useState(null);
  const { currentUser, currentUserRole } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("data[activeMarker].docID");
    console.log(data[activeMarker].docID);
    await updateDoc(doc(db, "Complaints", data[activeMarker].docID), {
      resolved: {
        isResolved: true,
        resolvedByName: currentUser.displayName,
        resolvedByRole: currentUserRole,
        resolvedImage: img,
      },
    }).then(console.log("submitted"));
  }

  return (
    <>
      <div>Name: {currentUser.displayName}</div>
      <div>Role: {currentUserRole}</div>
      <div>
        <ResolvedFormImageInput img={img} setimg={setimg} />
      </div>
      <div>
        <button onClick={handleSubmit} id="submitbtn">
          Submit
        </button>
      </div>
    </>
  );
};

export default ResolvedForm;
