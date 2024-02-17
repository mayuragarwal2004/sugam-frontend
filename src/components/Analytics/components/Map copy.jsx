import React, { useState, useMemo, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import greencircle from "./analytics/greencircle.png";
import redcircle from "./analytics/redcircle.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { View, StyleSheet, Alert } from "react-native";
import AuthContext from "../context/auth/AuthContext";
import { useAuth } from "../context/auth/AuthState";
import AnalyticsConfirmation from "./AnalyticsConfirmation";
import ImageOverlay from "./ImageOverlay";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: 1.1,
}));

export default function Map(props) {
  const { data, activeMarker, setActiveMarker, handleActiveMarker } = props;
  const [open, setOpen] = useState(false);
  const [currImg, setCurrImg] = useState(null);
  const [lastClicked, setlastClicked] = useState(null);

  function imgClick(src) {
    setCurrImg(src);
  }
  function handleImgCLose() {
    setCurrImg(null);
  }

  async function onYes() {
    if (lastClicked === "Not Valid") {
      await handleReportNotValid.then((check) => console.log(check));
    } else {
      await handleResolved.then((check) => console.log(check+"XXXXXX"));
    }
    // console.log(check);
    setOpen(false);
  }
  function onNo() {
    setOpen(false);
  }

  const handleReportNotValid = new Promise((resolve) => {
    // console.log();
    setTimeout(() => {
      console.log("Reported Not Validxxxxx");
      return resolve(true);
    }, 5000);
  });
  const handleResolved = new Promise((resolve) => {
    // console.log("Reported Resolved");
    setTimeout(() => {
      console.log("Reported Resolvedxxxxx");
      return resolve(true);
    }, 5000);
  });

  return (
    <>
      {open && (
        <AnalyticsConfirmation
          open={open}
          setOpen={setOpen}
          onYes={onYes}
          onNo={onNo}
        />
      )}
      {currImg && <ImageOverlay src={currImg} handleClose={handleImgCLose} />}
      <MarkerClusterer>
        {(clusterer) =>
          data.map((doc, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: doc.latitude, lng: doc.longitude }}
                onClick={() => handleActiveMarker(i)}
                clusterer={clusterer}
                icon={
                  "resolved" in doc && doc.resolved ? greencircle : redcircle
                }
              >
                {activeMarker === i ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <>
                      <div className="row1">
                        <table>
                          <tr>
                            <td>
                              <StyledButton
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  setOpen(true);
                                  setlastClicked("Not Valid");
                                }}
                              >
                                Report Not Valid
                              </StyledButton>
                            </td>
                            <td>
                              <StyledButton
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  setOpen(true);
                                  setlastClicked("Resolved");
                                }}
                              >
                                Resolved
                              </StyledButton>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="row">
                        <div className="column">
                          <img
                            src={doc.userImage}
                            loading="lazy"
                            alt="not found"
                            width="100%"
                            style={{ float: "left" }}
                            onClick={() => imgClick(doc.userImage)}
                          />
                        </div>
                        <p>
                          <b>Name: </b> {doc.fullname}
                          <br />
                          <b>Components Of Garbage: </b>{" "}
                          {doc.majorComponents.map((x, i) =>
                            doc.majorComponentsNumber - 1 === i ? x : x + ", "
                          )}
                          <br />
                          <b>Chronic Site: </b>
                          {parseInt(doc.majorComponentsNumber) > 3
                            ? "Yes"
                            : "No"}
                          <br />
                          <b>How often the site is cleaned: </b> {doc.siteClean}
                          <br />
                          <b>Recycle% : </b> {doc.percentRecycle}
                          <br />
                          <b>Since when is garbage overflowing?: </b>
                          {doc.overflowingWaste}
                          <br />
                          There is{" "}
                          {doc.dustbin === "Yes" ? (
                            <>
                              <b>a dustbin nearby, which is </b>
                              {doc.dustbinFilled === "Yes" ? (
                                <b>filled up</b>
                              ) : (
                                <b>not filled up.</b>
                              )}
                            </>
                          ) : (
                            <b>not a dustbin nearby.</b>
                          )}
                          <br />
                          PMC is{" "}
                          {doc.PMCCollecting === "Yes" ? (
                            <>
                              <b>seen cleaning</b> in this area.{" "}
                              {doc.garbageCollected}
                            </>
                          ) : (
                            <>
                              <b>not seen cleaning</b> in this area.
                            </>
                          )}
                          <br />
                          <b>Site Category: </b>{" "}
                          {doc.siteCategory.map((x, i) =>
                            doc.siteCategory.length - 1 === i ? x : x + ", "
                          )}
                        </p>
                      </div>
                    </>
                  </InfoWindow>
                ) : null}
              </Marker>
            );
          })
        }
      </MarkerClusterer>
    </>
  );
}

// function ChildMap() {

//   return (
//     <GoogleMap zoom={13} center={center} mapContainerClassName="gmap">
//     </GoogleMap>
//   );
// }
