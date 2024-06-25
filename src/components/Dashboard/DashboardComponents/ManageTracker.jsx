import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { db } from "../../../base";
import { ref, onValue } from "firebase/database";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageTracker = () => {
  const [inputData, setInputData] = useState({
    trackerID: {
      value: "",
      error: false,
      helperText: "",
    },
  });
  const [trackerData, setTrackerData] = useState([]);


  useEffect(() => {
    const trackCountRef = ref(db, 'tracker/');
    onValue(trackCountRef, (snapshot) => {
      const data = snapshot.val();
      const newData = [];
      Object.keys(data).forEach((x) => {
        newData.push({ id: x, ...data[x] });
      });
      setTrackerData(newData);
    });
  }, []);

  return (
    <div>
      <div style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "fit-content",
        margin: "auto",
      }}>
        <TextField
          error={inputData.trackerID.error}
          id="outlined-trackerID-input"
          label="Tracker ID"
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
        <button
          typeof="button"
          id="addrole-submitbtn"
        // onClick={handleAddRole}
        >
          Add
        </button>
      </div>
      <div className="worker-table">
        <table>
          <thead>
            <tr>
              <th>Tracker ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {trackerData.map((tracker, i) => (
              <tr key={i}>
                <td>{tracker.id}</td>
                <td>{tracker.lat}</td>
                <td>{tracker.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTracker;
