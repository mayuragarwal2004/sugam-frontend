import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthState";
import ResolvedFormImageInput from "./ResolvedFormImageInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../base";
import { Button } from "@mui/material";

const ResolvedForm = (props) => {
  const { data, activeMarker, handleResolveFormClose } = props;
  const [img, setimg] = useState(null);
  const { currentUser, currentUserRole } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!img) {
      alert("Please select an image");
      return;
    }
    fetch("/sugam/user/markComplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data[activeMarker].id,
        url: img,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleResolveFormClose(true);
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
        <Button onClick={handleSubmit} id="submitbtn">
          Submit
        </Button>
      </div>
    </>
  );
};

export default ResolvedForm;
