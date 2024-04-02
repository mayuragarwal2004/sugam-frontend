import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

function FormImageInput(props) {
  const { userImage, handleImageChange } = props;
  const [uploadProgress, setUploadProgress] = useState(undefined);

  function handleChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(
      storage,
      "ComplaintsImages/" + Date.now() + file.name
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Update progress state
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress <= 10) setUploadProgress(10);
        else setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        setUploadProgress(undefined);
        // Upload completed successfully, get download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          handleImageChange(downloadURL);
        });
      }
    );
  }

  console.log({ uploadProgress });

  return (
    <>
      <label htmlFor="img">
        Photo<span className="required-star">*</span>
      </label>
      <br />
      {userImage ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <img src={userImage} style={{ maxHeight: "100px" }} alt="img" />
        </div>
      ) : null}
      {/* Progress bar */}
      {uploadProgress !== undefined && (
        <LinearProgress variant="determinate" value={uploadProgress} />
        // <CircularProgress variant="determinate" value={uploadProgress} />
        // <progress value={uploadProgress} max="100" />
      )}
      <br />
      <input type="file" accept="image/*" onChange={handleChange} />
    </>
  );
}

export default FormImageInput;
