import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const ManageTracker = () => {
  const [inputData, setInputData] = useState({
    trackerID: {
      value: "",
      error: false,
      helperText: "",
    },
  });
  return (
    <div>
      <TextField
        error={inputData.trackerID.error}
        id="outlined-trackerID-input"
        label="Worker trackerID"
        value={inputData.trackerID.value}
        helperText={inputData.trackerID.helperText}
        autoComplete="off"
        inputProps={{ autoComplete: "off" }}
        onChange={(e) => {
          setInputData({
            ...inputData,
            trackerID: {
              value: e.target.value,
              error: false,
              helperText: "",
            },
          });
        }}
      />
    </div>
  );
};

export default ManageTracker;
