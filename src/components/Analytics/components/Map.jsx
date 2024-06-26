/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext } from "react";
import {
  MarkerF,
  InfoWindowF,
  PolygonF,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import greencircle from "./analytics/greencircle.png";
import bluecircle from "./analytics/bluecircle.png";
import garbageTruck from "./analytics/garbage-truck.png";
import redcircle from "./analytics/redcircle.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AuthContext from "../../context/auth/AuthContext";
import { useAuth } from "../../context/auth/AuthState";
import AnalyticsConfirmation from "./AnalyticsConfirmation";
import ImageOverlay from "./ImageOverlay";
import MapWidgets from "./MapWidgets";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { db } from "../../../base";
import { ref, onValue } from "firebase/database";

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
    showgeojson,
    handlePolygonClick,
    currentLocation,
    getNewData,
    route,
    setRoute,
  } = props;
  const [open, setOpen] = useState({
    state: false,
    lastClicked: null,
    confirm: null,
  });
  const [currImg, setCurrImg] = useState(null);
  const [activeDocID, setActiveDocID] = useState(null);
  const [lastClicked, setlastClicked] = useState(null);
  const [trackerData, setTrackerData] = useState([]);

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
  function handleResolveFormClose(refresh = false) {
    setOpen({ state: false, lastClicked: null, confirm: null });
    if (refresh) {
      getNewData();
    }
  }

  function handleReportNotValid() {
    console.log("Reported Not Valid");
  }
  function handleResolved() {
    console.log("Reported Resolved");
  }

  console.log({ data });

  console.log({ open });

  console.log({ activeMarker });

  async function handleClick() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: currentLocation,
      destination: {
        lat: data[activeMarker].latitude,
        lng: data[activeMarker].longitude,
      },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });
    setRoute({ result: result, ishidden: false });
  }

  useEffect(() => {
    const trackCountRef = ref(db, "tracker/");
    onValue(trackCountRef, (snapshot) => {
      const data = snapshot.val();
      const newData = [];
      Object.keys(data).forEach((x) => {
        newData.push({ id: x, ...data[x] });
      });
      setTrackerData(newData);
    });
  }, []);

  console.log({ trackerData });

  console.log({ route });

  return (
    <>
      {!route.ishidden && <DirectionsRenderer directions={route.result} />}
      <MapWidgets />
      {open.state && (
        <AnalyticsConfirmation
          open={open}
          setOpen={setOpen}
          onYes={onYes}
          handleResolveFormClose={handleResolveFormClose}
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
        showgeojson &&
        geojson.length > 0 &&
        geojson.map((shape, i) => (
          <PolygonF
            paths={shape.geometry.coordinates}
            onClick={() => {
              console.log("shape");
              console.log(shape.properties);
              handlePolygonClick(shape.properties.WardZone);
            }}
          />
        ))}
      {trackerData.map((val, i) => (
        <MarkerF
          key={i}
          position={{ lng: val.lng, lat: val.lat }}
          // onClick={() => handleActiveMarker(i)}
          icon={garbageTruck}
        />
      ))}
      <MarkerClusterer>
        {(clusterer) =>
          data.map((doc, i) => {
            return (
              <MarkerF
                key={i}
                position={{ lng: doc.longitude, lat: doc.latitude }}
                onClick={() => handleActiveMarker(i)}
                clusterer={clusterer}
                icon={doc.status === "COMPLETE" ? greencircle : redcircle}
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
                        {doc.status === "COMPLETE" ? (
                          <>
                            {doc.resolvedImageURL ? (
                              <Alert variant="filled" severity="success">
                                Complaint has been resolved.
                              </Alert>
                            ) : (
                              <Alert variant="filled" severity="warning">
                                <AlertTitle>
                                  Complaint has been flagged as invalid.
                                </AlertTitle>
                                Reason: {doc.invalidComplaintMessage}
                              </Alert>
                            )}
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                      <div
                        className={doc.resolvedImageURL ? "column" : "row"}
                        style={{
                          alignItems: "center",
                          padding: "10px",
                          width: "100%",
                        }}
                        id="infoWindowBody"
                      >
                        <div
                          className={doc.resolvedImageURL ? "row" : "column"}
                          style={{ padding: 0 }}
                        >
                          <img
                            src={doc.imageURL}
                            loading="lazy"
                            alt="not found"
                            width="100%"
                            style={{ float: "left" }}
                            onClick={() => imgClick(doc.imageURL)}
                          />
                          {doc.resolvedImageURL && (
                            <img
                              src={doc.resolvedImageURL}
                              alt="Resolved Image"
                            />
                          )}
                        </div>
                        <p>
                          <span style={{ color: "white" }}>
                            <b>Reported By ID: </b> {doc.id}
                            <br />
                          </span>
                          <b>Reported By: </b> {doc.username}
                          <br />
                          <b>Reported On: </b> {doc.reported}
                          <br />
                          <b>Components Of Garbage: </b>{" "}
                          {doc.types.map((x, i) =>
                            doc.types.length - 1 === i ? x : x + ", "
                          )}
                          <br />
                          <b>Chronic Site: </b>
                          {parseInt(doc.types) > 3 ? "Yes" : "No"}
                          <br />
                          {doc.location && (
                            <>
                              <b>Ward: </b> {doc.location}
                              <br />
                            </>
                          )}
                          {doc.siteCleanFrequency && (
                            <>
                              <b>How often the site is cleaned: </b>{" "}
                              {doc.siteCleanFrequency}
                              <br />
                            </>
                          )}
                          {doc.wasteRecyclable && (
                            <>
                              <b>Recycle% : </b> {doc.wasteRecyclable}
                              <br />
                            </>
                          )}
                          {doc.siteUncleanDuration && (
                            <>
                              <b>Since when is garbage overflowing?: </b>
                              {doc.siteUncleanDuration}
                              <br />
                            </>
                          )}
                          {doc.dustbin && (
                            <>
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
                            </>
                          )}
                          {doc.pmcCleanSite && (
                            <>
                              PMC is{" "}
                              {doc.pmcCleanSite ? (
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
                            </>
                          )}
                          {doc.siteCategory && (
                            <>
                              <b>Site Category: </b> {doc.siteCategory}
                            </>
                          )}
                        </p>
                      </div>
                      <div
                        className="row"
                        style={{ alignItems: "center", padding: 0 }}
                      >
                        <a
                          href={`https://www.google.com/maps?q=${doc.latitude},${doc.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="contained" style={{ margin: "2px" }}>
                            Open in Google Maps
                          </Button>
                        </a>
                        <Button
                          onClick={handleClick}
                          variant="contained"
                          style={{ margin: "2px" }}
                        >
                          Get Directions
                        </Button>
                      </div>
                    </>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            );
          })
        }
      </MarkerClusterer>
      {currentLocation.lat && (
        <MarkerF position={currentLocation} icon={bluecircle} />
      )}
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
