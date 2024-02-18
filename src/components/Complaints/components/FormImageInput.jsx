/* eslint-disable default-case */
// import logo from './logo.svg';
// import './ImageInput.css';
import React from "react";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function FormImageInput(props) {
  const { userImage, handleImageChange } = props;
  function handleChange(e) {
    e.preventDefault();
    const file = e.target.files[0]
    const storage = getStorage();
    const storageRef = ref(
      storage,
      "ComplaintsImages/" + Date.now() + file.name
    );
    // storageRef = ref(storageRef, file.name);

    // 'file' comes from the Blob or File API
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          handleImageChange(downloadURL);
        });
      }
    );
  }

  return (
    <>
      <label htmlFor="img">
        Photo<span className="required-star">*</span>
      </label>
      <br />
      {userImage ? (
        <img src={userImage} style={{ maxHeight: "100px" }} alt="img" />
      ) : (
        <></>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {JSON.stringify(userImage)}
    </>
  );
}

export default FormImageInput;
