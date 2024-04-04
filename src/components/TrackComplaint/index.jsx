import React, { useState } from "react";
import "./TrackComplaint.css";
import { Button } from "@mui/material";
import { isJsonString } from "../../utilityFunctions";

const TrackComplaint = () => {
  const [complaintNumber, setComplaintNumber] = useState();
  const [trackData, setTrackData] = useState({
    id: "bbae789f-ceea-40bd-8d1b-f5b4b2b3837a",
    description: null,
    location: "Salisbury Park - Maharshi Nagar",
    userID: "admin",
    severity: "MEDIUM",
    timestamp: "2024-04-02T14:57:11.000+00:00",
    status: "PENDING",
    coordX: 73.8729804,
    coordY: 18.4832227,
    wasteType: ["CONSTRUCTION"],
    resolvedTime: null,
    dustbinNearby: false,
    dustbinOverflow: false,
    pmcCleanSite: false,
    siteCleanFrequency: "",
    siteUncleanDuration: "",
    wasteRecyclable: "",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/sugam-59122.appspot.com/o/ComplaintsImages%2F1712069820117Screenshot%202023-08-25%20215529.png?alt=media&token=526ea3cd-b94d-4716-b414-f5ee130d16b1",
    resolvedImageURL: null,
    geohash: null,
    invalidComplaintMessage: "",
    siteType: null,
  });
  const handleTrack = () => {
    fetch(`/sugam/user/trackComplaint?complaintNumber=${complaintNumber}`)
      .then((response) => {
        console.log(response);
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            console.log(new TextDecoder().decode(value));
            console.log({ value });
            if (isJsonString(new TextDecoder().decode(value))) {
              setTrackData(JSON.parse(new TextDecoder().decode(value)));
            }
            return;
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };
  return (
    <div className="track-comaplint-parent">
      <div className="comaplint-number-input">
        <input
          type="number"
          name="complaint-number"
          id="complaint-number"
          placeholder="Enter Complaint Number"
          value={complaintNumber}
          onChange={(e) => setComplaintNumber(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="success" onClick={handleTrack}>
          Track
        </Button>
      </div>
      <div className="track-data-view">
        
      </div>
    </div>
  );
};

export default TrackComplaint;
