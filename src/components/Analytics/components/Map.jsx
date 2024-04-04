import React, { useState, useEffect, useContext } from "react";
import {
  Marker,
  InfoWindowF,
  PolygonF,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import greencircle from "./analytics/greencircle.png";
import bluecircle from "./analytics/bluecircle.png";
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
        lat: data[activeMarker].coordY,
        lng: data[activeMarker].coordX,
      },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });
    setRoute({ result: result, ishidden: false });
  }

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
              handlePolygonClick(shape.properties.ward);
            }}
          />
        ))}
      <MarkerClusterer>
        {(clusterer) =>
          data.map((doc, i) => {
            return (
              <Marker
                key={i}
                position={{ lng: doc.coordX, lat: doc.coordY }}
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
                            src={doc.imageURL}
                            loading="lazy"
                            alt="not found"
                            width="100%"
                            style={{ float: "left" }}
                            onClick={() => imgClick(doc.imageURL)}
                          />
                        </div>
                        <p>
                          <b>Name: </b> {doc.userID}
                          <br />
                          <b>Components Of Garbage: </b>{" "}
                          {doc.wasteType.map((x, i) =>
                            doc.wasteType.length - 1 === i ? x : x + ", "
                          )}
                          <br />
                          <b>Chronic Site: </b>
                          {parseInt(doc.wasteType) > 3 ? "Yes" : "No"}
                          <br />
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
                      <div className="row">
                        <a
                          href={`https://www.google.com/maps?q=${doc.coordY},${doc.coordX}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="contained">
                            Open in Google Maps
                          </Button>
                        </a>
                        <Button onClick={handleClick} variant="contained">
                          Get Directions
                        </Button>
                      </div>
                    </>
                  </InfoWindowF>
                ) : null}
              </Marker>
            );
          })
        }
      </MarkerClusterer>
      {currentLocation.lat && (
        <Marker position={currentLocation} icon={bluecircle} />
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
