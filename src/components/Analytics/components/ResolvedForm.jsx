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
    fetch(`/sugam/user/markComplete?id=${data[activeMarker].id}&url=${img}`)
      .then((response) => {
        console.log(response);
      })
      .then(console.log("submitted"));
  }

  return (
    <>
      <div>Name: {currentUser.username}</div>
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
