/* eslint-disable default-case */
// import logo from './logo.svg';
// import './ImageInput.css';
import React, { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ResolvedFormImageInput(props) {
  const { img, setimg } = props;
  const [uploadProgress, setUploadProgress] = useState(undefined);
  const hiddenFileInput = useRef(null);

  function handleChange(e) {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    console.log(e);
    const storage = getStorage();
    const storageRef = ref(
      storage,
      "ComplaintsResolvedImages/" + Date.now() + file.name
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
        if (progress <= 30) setUploadProgress(30);
        else setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        setTimeout(() => {
          setUploadProgress(undefined);
          console.log("Upload completed");
        }, 2000);
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setimg(downloadURL);
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
      {img && <img src={img} style={{ maxHeight: "100px" }} alt="img" />}
      <br />
      {/* Progress bar */}
      {uploadProgress !== undefined && (
        <LinearProgress variant="determinate" value={uploadProgress} />
      )}
      <br />
      <Button
        variant="contained"
        onClick={() => hiddenFileInput.current.click()}
        endIcon={<CloudUploadIcon />}
      >
        Click to upload Image
      </Button>
      <input
        type="file"
        id="img"
        name="img"
        ref={hiddenFileInput}
        hidden
        onChange={handleChange}
        accept="image/*"
        style={{ minWidth: "200px" }}
        capture="user"
        required
      />
    </>
  );
}

export default ResolvedFormImageInput;
