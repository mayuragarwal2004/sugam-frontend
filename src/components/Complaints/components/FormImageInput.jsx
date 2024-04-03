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

function FormImageInput(props) {
  const { userImage, handleImageChange } = props;
  const [uploadProgress, setUploadProgress] = useState(undefined);
  const hiddenFileInput = useRef(null);

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
        if (progress <= 30) setUploadProgress(30);
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
        ref={hiddenFileInput}
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </>
  );
}

export default FormImageInput;
