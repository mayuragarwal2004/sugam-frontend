import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const SingleComplaint = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`/java/api/userspace/getComplaint/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log({ data });
      setComplaint(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      {complaint && (
        <Card sx={{ maxWidth: 600, margin: "20px auto", boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={complaint.imageURL}
            alt="Complaint Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Location: {complaint.location}
            </Typography>
            {complaint.invalidComplaintMessage && (
              <Typography variant="body2" color="text.secondary">
                Not Valid Reported due to {complaint.invalidComplaintMessage}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Severity: {complaint.severity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {complaint.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timestamp: {new Date(complaint.timestamp).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Waste Type: {complaint.types.join(", ")}
            </Typography>
            {complaint.dustbinNearby && (
              <Typography variant="body2" color="text.secondary">
                Dustbin Nearby: {complaint.dustbinNearby ? "Yes" : "No"}
              </Typography>
            )}
            {complaint.dustbinOverflow && (
              <Typography variant="body2" color="text.secondary">
                Dustbin Overflow: {complaint.dustbinOverflow ? "Yes" : "No"}
              </Typography>
            )}
            {complaint.pmcCleanSite && (
              <Typography variant="body2" color="text.secondary">
                PMC Clean Site: {complaint.pmcCleanSite ? "Yes" : "No"}
              </Typography>
            )}
            {complaint.description && (
              <Typography variant="body2" color="text.secondary">
                Description: {complaint.description}
              </Typography>
            )}
            {complaint.resolvedImageURL && (
              <>
                <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                  Resolved Image
                </Typography>
                <CardMedia
                  component="img"
                  height="200"
                  image={complaint.resolvedImageURL}
                  alt="Resolved Image"
                />
              </>
            )}
            {complaint.invalidAI === false && (
              <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                AI Detection: No garbage found.
              </Typography>
            )}
            {complaint.invalidComplaintMessage && (
              <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                Invalid Complaint: {complaint.invalidComplaintMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default SingleComplaint;
