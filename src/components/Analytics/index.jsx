import React, { useMemo, useState, useEffect } from "react";
import Map from "./components/Map";
import "./analytics.css";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { app } from "../../base";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Button from "@mui/material/Button";
import punegeojson from "./pune.geojson";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import IconButton from "@mui/material/IconButton";

// sort by ward
// sort by address
// sort by time
// sort by status
// sort by type
// sort by severity

function Analytics() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [filterPanel, setFilterPanel] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [activeMarker, setActiveMarker] = useState(null);
  const fullscreenHandle = useFullScreenHandle();
  const [zoom, setzoom] = useState(15);
  const [map, setMap] = useState(null);
  const [sortByTimeOption, setsortByTimeOption] = useState("24 hours");
  const [sortByTimeValue, setsortByTimeValue] = useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  const [complaintStatus, setcomplaintStatus] = useState({
    completed: true,
    notCompleted: true,
  });
  const [sortByAddessOption, setsortByAddessOption] = useState(0);
  const [sortByWardOption, setsortByWardOption] = useState(-1);
  const [geojson, setgeojson] = useState();
  const [citygeojson, setcitygeojson] = useState();
  const [showgeojson, setshowgeojson] = useState(false);
  const [activeWard, setactiveWard] = useState();
  const [sortBySeverityOption, setsortBySeverityOption] = useState({
    low: true,
    medium: true,
    high: true,
  });
  const [sortByTypeOption, setsortByTypeOption] = useState({
    "dry waste": true,
    "wet waste": true,
    "construction waste": true,
    "plant waste": true,
    clothes: true,
    "medical waste": true,
    "sanitary waste": true,
  });
  const [activeFilters, setactiveFilters] = useState({
    status: true,
    time: true,
    location: true,
    severity: true,
    type: true,
  });

  const handleSeverity = (e) => {
    setsortBySeverityOption({
      ...sortBySeverityOption,
      [e.target.name]: e.target.checked,
    });
  };

  const handleComplaintStatus = (e) => {
    setcomplaintStatus({
      ...complaintStatus,
      [e.target.name]: e.target.checked,
    });
  };

  const handleGarbageType = (e) => {
    setsortByTypeOption({
      ...sortByTypeOption,
      [e.target.name]: e.target.checked,
    });
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleActiveWard = (ward) => {
    // if (ward === activeWard) {
    //   return;
    // }
    setactiveWard(ward);
  };

  const center = useMemo(() => ({ lat: 18.4807627, lng: 73.8724301 }), []);
  const [queryData, setqueryData] = useState([]);

  useEffect(() => {
    if (fullscreenHandle.active) {
      document.documentElement.style.setProperty("--maps-body-height", "100vh");
    } else {
      document.documentElement.style.setProperty(
        "--maps-body-height",
        "var(--default-maps-body-height)"
      );
    }
  }, [fullscreenHandle.active]);

  function getGeoJson() {
    fetch(punegeojson)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = [];
        data.features.map((shape) => {
          const formattedShape = { properties: shape.properties };
          var latsum = 0;
          var lngsum = 0;
          var maxlat = -90;
          var maxlng = -180;
          var minlat = 90;
          var minlng = 180;
          const formattedCoordinates = [];
          shape.geometry.coordinates[0].map((coord) => {
            formattedCoordinates.push({ lat: coord[1], lng: coord[0] });
            latsum += coord[1];
            lngsum += coord[0];
            if (coord[1] > maxlat) {
              maxlat = coord[1];
            }
            if (coord[0] > maxlng) {
              maxlng = coord[0];
            }
            if (coord[1] < minlat) {
              minlat = coord[1];
            }
            if (coord[0] < minlng) {
              minlng = coord[0];
            }
          });
          formattedShape.geometry = { coordinates: formattedCoordinates };
          formattedShape.center = {
            lat: latsum / shape.geometry.coordinates[0].length,
            lng: lngsum / shape.geometry.coordinates[0].length,
          };
          formattedShape.bounds = {
            maxlat: maxlat,
            maxlng: maxlng,
            minlat: minlat,
            minlng: minlng,
          };
          formattedData.push(formattedShape);
        });
        setcitygeojson(formattedData);
        setgeojson(formattedData);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  const filterGeoJSONByWardNo = (wardNo) => {
    const filteredData = [];
    citygeojson.map((shape, index) => {
      if (shape.properties["ward"] === wardNo) {
        filteredData.push(shape);
        setsortByWardOption(shape.properties["ward"]);
        if (filteredData.length === 1) {
          map.setCenter(shape.center);
          map.setZoom(15);
        }
      }
    });
    setgeojson(filteredData);
  };

  const handlePolygonClick = (ward) => {
    if (sortByAddessOption === 1 && sortByWardOption === -1)
      filterGeoJSONByWardNo(ward);
  };

  useEffect(() => {
    getGeoJson();
  }, []);

  const getNewData = () => {
    const status = [];
    const locations = [];
    const severity = [];
    const type = [];
    var time1 = sortByTimeValue[0].unix();
    var time2 = sortByTimeValue[1].unix();
    if (complaintStatus.completed) {
      status.push("COMPLETE");
    }
    if (complaintStatus.notCompleted) {
      status.push("PENDING");
    }

    if (sortByTimeOption === "custom") {
      time1 = sortByTimeValue[0].toISOString();
      time2 = sortByTimeValue[1].toISOString();
    } else {
      time2 = dayjs().toISOString();
    }
    if (sortByTimeOption === "24 hours") {
      time1 = dayjs().subtract(1, "day").toISOString();
    } else if (sortByTimeOption === "2 days") {
      time1 = dayjs().subtract(2, "day").toISOString();
    } else if (sortByTimeOption === "4 days") {
      time1 = dayjs().subtract(4, "day").toISOString();
    } else if (sortByTimeOption === "1 week") {
      time1 = dayjs().subtract(1, "week").toISOString();
    }

    if (sortBySeverityOption.low) {
      severity.push("LOW");
    }
    if (sortBySeverityOption.medium) {
      severity.push("MEDIUM");
    }
    if (sortBySeverityOption.high) {
      severity.push("HIGH");
    }

    if (sortByTypeOption["dry waste"]) {
      type.push("DRY");
    }
    if (sortByTypeOption["wet waste"]) {
      type.push("WET");
    }
    if (sortByTypeOption["construction waste"]) {
      type.push("CONSTRUCTION");
    }
    if (sortByTypeOption["plant waste"]) {
      type.push("PLANT");
    }
    if (sortByTypeOption.clothes) {
      type.push("CLOTHES");
    }
    if (sortByTypeOption["medical waste"]) {
      type.push("MEDICAL");
    }
    if (sortByTypeOption["sanitary waste"]) {
      type.push("SANITARY");
    }

    citygeojson.map((ward) => {
      if (ward.properties.ward === sortByWardOption)
        locations.push(ward.properties["name-mr"]);
    });
    const reqbody = {
      status: status,
      time1,
      time2,
    };
    if (severity.length > 0) reqbody.severity = severity;
    if (locations.length > 0 && sortByAddessOption !== 0)
      reqbody.locations = locations;

    if (type.length > 0) reqbody.type = type;
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;

    fetch("/sugam/analytics/getQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    })
      .then((response) => response.json())
      .then((data) => {
        setqueryData(data);
      });
  };

  const handleFilterPanelView = () => {
    setFilterPanel((prev) => !prev);
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    };
  }, []);

  return (
    <>
      <FullScreen handle={fullscreenHandle}>
        <div
          className={`maps-main-body ${
            fullscreenHandle.active ? "fullscreen-map" : ""
          }`}
        >
          <div className="maps-body-gmap">
            {!isLoaded ? (
              <div>Loading...</div>
            ) : (
              <GoogleMap
                zoom={13}
                center={center}
                mapContainerClassName="gmap"
                onClick={() => setActiveMarker(null)}
                fullscreenControl={true}
                onLoad={(map) => {
                  setMap(map);
                }}
                options={{
                  zoomControl: false,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false,
                  gestureHandling: "greedy",
                }}
              >
                <>
                  {queryData && (
                    <Map
                      data={queryData}
                      getNewData={getNewData}
                      activeMarker={activeMarker}
                      setActiveMarker={setActiveMarker}
                      handleActiveMarker={handleActiveMarker}
                      activeWard={activeWard}
                      setactiveWard={setactiveWard}
                      geojson={geojson}
                      handleActiveWard={handleActiveWard}
                      showgeojson={showgeojson}
                      handlePolygonClick={handlePolygonClick}
                      currentLocation={currentLocation}
                    />
                  )}
                </>
              </GoogleMap>
            )}
          </div>
          <div className="user-location-widget">
            <IconButton
              aria-label="previous question"
              style={{ height: "fit-content" }}
              onClick={() => {
                if (currentLocation.lat !== 0 && currentLocation.lng !== 0)
                  map.setCenter(currentLocation);
                else alert("Location not available");
              }}
            >
              <GpsFixedIcon />
            </IconButton>
          </div>
          <div className="main-map-overlay">
            <div
              className={"filter-panel-main-parent ".concat(
                filterPanel ? "active" : "inactive"
              )}
            >
              <div
                className="arrow-main-parent"
                onClick={handleFilterPanelView}
              >
                {
                  <ArrowBackIosNewIcon
                    sx={{ color: "white" }}
                    className="arrow-main"
                    id="arrow-main"
                  />
                }
              </div>
              <div className="left-panel-main-parent">
                <div
                  className={`left-panel-row ${
                    activeFilters.status ? "" : "inactive"
                  }`}
                  style={{ marginBottom: "10px" }}
                >
                  <div
                    className="left-panel-row-title"
                    onClick={() => {
                      setactiveFilters({
                        ...activeFilters,
                        status: !activeFilters.status,
                      });
                    }}
                  >
                    <div className="title-main">Complaint Status</div>
                    <ExpandMoreIcon className="arrow-icon" />
                  </div>
                  <div className="left-panel-row-body">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="completed"
                            checked={complaintStatus.completed}
                            onChange={handleComplaintStatus}
                            value={complaintStatus.completed}
                          />
                        }
                        label="Completed"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="notCompleted"
                            checked={complaintStatus.notCompleted}
                            onChange={handleComplaintStatus}
                            value={complaintStatus.notCompleted}
                          />
                        }
                        label="Not Completed"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div
                  className={`left-panel-row ${
                    activeFilters.type ? "" : "inactive"
                  }`}
                  style={{ marginBottom: "10px" }}
                >
                  <div
                    className="left-panel-row-title"
                    onClick={() => {
                      setactiveFilters({
                        ...activeFilters,
                        type: !activeFilters.type,
                      });
                    }}
                  >
                    <div className="title-main">Sort by garbage type</div>
                    <ExpandMoreIcon className="arrow-icon" />
                  </div>
                  <div className="left-panel-row-body">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="dry waste"
                            checked={sortByTypeOption["dry waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["dry waste"]}
                          />
                        }
                        label="Dry Waste"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="wet waste"
                            checked={sortByTypeOption["wet waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["wet waste"]}
                          />
                        }
                        label="Wet Waste"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="construction waste"
                            checked={sortByTypeOption["construction waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["construction waste"]}
                          />
                        }
                        label="Construction Waste"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="plant waste"
                            checked={sortByTypeOption["plant waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["plant waste"]}
                          />
                        }
                        label="Plant Waste"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="clothes"
                            checked={sortByTypeOption["clothes"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["clothes"]}
                          />
                        }
                        label="Clothes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="medical waste"
                            checked={sortByTypeOption["medical waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["medical waste"]}
                          />
                        }
                        label="Medical Waste"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="medical waste"
                            checked={sortByTypeOption["sanitary waste"]}
                            onChange={handleGarbageType}
                            value={sortByTypeOption["sanitary waste"]}
                          />
                        }
                        label="Sanitary Waste"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div
                  className={`left-panel-row ${
                    activeFilters.severity ? "" : "inactive"
                  }`}
                >
                  <div
                    className="left-panel-row-title"
                    onClick={() => {
                      setactiveFilters({
                        ...activeFilters,
                        severity: !activeFilters.severity,
                      });
                    }}
                  >
                    <div className="title-main">Severity</div>
                    <ExpandMoreIcon className="arrow-icon" />
                  </div>
                  <div className="left-panel-row-body">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="low"
                            checked={sortBySeverityOption.low}
                            onChange={handleSeverity}
                            value={sortBySeverityOption.low}
                          />
                        }
                        label="Low"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="medium"
                            checked={sortBySeverityOption.medium}
                            onChange={handleSeverity}
                            value={sortBySeverityOption.medium}
                          />
                        }
                        label="Medium"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="high"
                            checked={sortBySeverityOption.high}
                            onChange={handleSeverity}
                            value={sortBySeverityOption.high}
                          />
                        }
                        label="High"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div
                  className={`left-panel-row ${
                    activeFilters.time ? "" : "inactive"
                  }`}
                >
                  <div
                    className="left-panel-row-title"
                    style={{ marginTop: "20px" }}
                    onClick={() => {
                      setactiveFilters({
                        ...activeFilters,
                        time: !activeFilters.time,
                      });
                    }}
                  >
                    <div className="title-main">Sort by Time</div>
                    <ExpandMoreIcon className="arrow-icon" />
                  </div>
                  <div
                    className="left-panel-row-body"
                    style={{ marginTop: "10px" }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sort by time
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortByTimeOption}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        label="Sort by time"
                        onChange={(e) => setsortByTimeOption(e.target.value)}
                      >
                        <MenuItem value={"24 hours"}>Last 24 hours</MenuItem>
                        <MenuItem value={"2 days"}>Last 2 day</MenuItem>
                        <MenuItem value={"4 days"}>Last 4 days</MenuItem>
                        <MenuItem value={"1 week"}>Last 1 week</MenuItem>
                        <MenuItem value={"custom"}>Custom Time Input</MenuItem>
                      </Select>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {sortByTimeOption === "custom" && (
                          <DemoContainer
                            components={["DateRangePicker", "DateRangePicker"]}
                          >
                            <DemoItem
                              label="Choose Date Range"
                              component="DateRangePicker"
                            >
                              <DateRangePicker
                                value={sortByTimeValue}
                                onChange={(newValue) =>
                                  setsortByTimeValue(newValue)
                                }
                              />
                            </DemoItem>
                          </DemoContainer>
                        )}
                      </LocalizationProvider>
                    </FormControl>
                  </div>
                </div>
                <div
                  className={`left-panel-row ${
                    activeFilters.location ? "" : "inactive"
                  }`}
                >
                  <div
                    className="left-panel-row-title"
                    style={{ marginTop: "20px" }}
                    onClick={() => {
                      setactiveFilters({
                        ...activeFilters,
                        location: !activeFilters.location,
                      });
                    }}
                  >
                    <div className="title-main">Sort by Location</div>
                    <ExpandMoreIcon className="arrow-icon" />
                  </div>
                  <div
                    className="left-panel-row-body"
                    style={{ marginTop: "10px" }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        View data by
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortByAddessOption}
                        label="View data by"
                        onChange={(e) => {
                          setsortByAddessOption(e.target.value);
                          setshowgeojson(true);
                          if (e.target.value === 2) {
                            map.setCenter(center);
                            map.setZoom(13);
                          }
                          if (e.target.value === 1) {
                            setgeojson(citygeojson);
                          }
                          if (e.target.value === 0) {
                            setshowgeojson(false);
                            setsortByWardOption(-1);
                          }
                        }}
                      >
                        <MenuItem value={0}>No Sort</MenuItem>
                        <MenuItem value={1}>Ward</MenuItem>
                        <MenuItem value={2}>City</MenuItem>
                      </Select>
                    </FormControl>
                    {sortByAddessOption === 1 && (
                      <FormControl fullWidth style={{ marginTop: "10px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Choose Ward
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sortByWardOption}
                          label="Choose Ward"
                          onChange={(e) => {
                            setsortByWardOption(e.target.value);
                            if (e.target.value === -1) {
                              setgeojson(citygeojson);
                              setshowgeojson(true);
                            } else if (e.target.value === -2) {
                              // get current ward
                              setshowgeojson(false);
                            } else {
                              setshowgeojson(true);

                              setgeojson(() =>
                                filterGeoJSONByWardNo(e.target.value)
                              );
                            }
                          }}
                        >
                          <MenuItem value={-1}>Select Ward</MenuItem>
                          <MenuItem value={-2}>Get Current Ward</MenuItem>
                          {citygeojson &&
                            citygeojson.map((shape, index) => (
                              <MenuItem
                                value={shape.properties["ward"]}
                                key={index}
                              >
                                {shape.properties["name-mr"]}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )}
                  </div>
                </div>
                <Button onClick={getNewData}>Get Data</Button>
              </div>
            </div>
            <div>hello</div>
            {/* <div className="right-panel-main-parent">right hello</div> */}
          </div>
        </div>
      </FullScreen>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={fullscreenHandle.enter}
          sx={{ margin: "10px" }}
          variant="contained"
        >
          Enter FUll Screen
        </Button>
      </div>
      {/* {queryData && <ComplainCards data={queryData} />} */}
    </>
  );
}

export default Analytics;
