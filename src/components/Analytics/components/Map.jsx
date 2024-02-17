import React, { useState, useEffect, useContext } from "react";
import {
  Marker,
  InfoWindowF,
  PolygonF,
  MarkerClusterer,
} from "@react-google-maps/api";
import greencircle from "./analytics/greencircle.png";
import redcircle from "./analytics/redcircle.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { View, StyleSheet, Alert } from "react-native";
import AuthContext from "../../context/auth/AuthContext";
import { useAuth } from "../../context/auth/AuthState";
import AnalyticsConfirmation from "./AnalyticsConfirmation";
import ImageOverlay from "./ImageOverlay";
import MapWidgets from "./MapWidgets";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: 1.1,
}));

export default function Map(props) {
  const {
    data,
    activeMarker,
    setActiveMarker,
    handleActiveMarker,
    geojson,
    activeWard,
    setactiveWard,
    handleActiveWard,
  } = props;
  const [open, setOpen] = useState({
    state: false,
    lastClicked: null,
    confirm: null,
  });
  const [currImg, setCurrImg] = useState(null);
  const [activeDocID, setActiveDocID] = useState(null);
  const [lastClicked, setlastClicked] = useState(null);

  console.log(activeMarker);
  function imgClick(src) {
    setCurrImg(src);
  }
  function handleImgCLose() {
    setCurrImg(null);
  }

  const handleOpen = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function onYes() {
    const check =
      open.lastClicked === "Not Valid"
        ? handleReportNotValid()
        : handleResolved();
    setOpen((prev) => ({ ...prev, confirm: true }));
  }
  function onNo() {
    setOpen({ state: false, lastClicked: null, confirm: null });
  }

  function handleReportNotValid() {
    console.log("Reported Not Valid");
  }
  function handleResolved() {
    console.log("Reported Resolved");
  }

  console.log({ activeWard });

  return (
    <>
      <MapWidgets />
      {open.state && (
        <AnalyticsConfirmation
          open={open}
          setOpen={setOpen}
          onYes={onYes}
          onNo={onNo}
          data={data}
          activeMarker={activeMarker}
        />
      )}
      {currImg && <ImageOverlay src={currImg} handleClose={handleImgCLose} />}

      {activeWard && (
        <InfoWindowF
          onCloseClick={() => {
            setactiveWard(null);
          }}
          position={activeWard.location}
        >
          <>
            <div>Ward </div>
          </>
        </InfoWindowF>
      )}
      {geojson &&
        geojson.map((shape, i) => (
          <PolygonF
            paths={shape.geometry.coordinates}
            onClick={() => {
              handleActiveWard({
                location: shape.center,
              });
              console.log("clicked");
            }}
          >
            {activeWard === i ? (
              <InfoWindowF
                onCloseClick={() => {
                  setactiveWard(null);
                }}
              >
                <>
                  <h1>Ward {shape.properties.WARD_NO}</h1>
                </>
              </InfoWindowF>
            ) : null}
          </PolygonF>
        ))}
      <MarkerClusterer>
        {(clusterer) =>
          data.map((doc, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: doc.latitude, lng: doc.longitude }}
                onClick={() => handleActiveMarker(i)}
                clusterer={clusterer}
                icon={doc.resolved?.isResolved ? greencircle : redcircle}
              >
                {activeMarker === i ? (
                  <InfoWindowF
                    onCloseClick={() => {
                      setActiveMarker(null);
                      setActiveDocID(null);
                    }}
                  >
                    <>
                      <div className="row1">
                        <div style={{ margin: "0px 5px" }}>
                          <StyledButton
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setOpen((prev) => ({
                                ...prev,
                                state: true,
                                lastClicked: "Not Valid",
                              }));
                              setlastClicked("Not Valid");
                            }}
                          >
                            Report Not Valid
                          </StyledButton>
                        </div>
                        <div style={{ margin: "0px 5px" }}>
                          <StyledButton
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => {
                              setOpen((prev) => ({
                                ...prev,
                                state: true,
                                lastClicked: "Resolved",
                              }));
                            }}
                          >
                            Resolved
                          </StyledButton>
                        </div>
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
                          {doc.notValid && (
                            <p>Not Valid Reported: {doc.notValid.length}</p>
                          )}
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
                  </InfoWindowF>
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
// component, timestamp, valid
