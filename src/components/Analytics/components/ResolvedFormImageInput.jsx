/* eslint-disable default-case */
// import logo from './logo.svg';
// import './ImageInput.css';
import React from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function ResolvedFormImageInput(props) {
  const { img, setimg } = props;
  function handleChange(e) {
    if (e.target.files.length===0){
      return
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
          setimg(downloadURL);
        });
      }
    );
  }
  return (
    <>
      <label htmlFor="img" >
        Photo<span className="required-star">*</span>
      </label>
      <br />
      {img && <img src={img} style={{ maxHeight: "100px" }} alt="img" />}
      <input
        type="file"
        id="img"
        name="img"
        onChange={handleChange}
        accept="image/*"
        style={{minWidth:"200px"}}
        required
      />
    </>
  );
}

export default ResolvedFormImageInput;
