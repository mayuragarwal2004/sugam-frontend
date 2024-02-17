import React, { useMemo, useState, useEffect } from "react";
import Map from "./components/Map";
import "./analytics.css";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { app } from "../../base";
import ComplainCards from "./components/ComplainCards";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import geojson from "../data/Municipal_Spatial/Pune/pune-electoral-wards_current.geojson"

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
import { Button } from "@mui/material";

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
  const [activeMarker, setActiveMarker] = useState(null);
  const fullscreenHandle = useFullScreenHandle();
  const [zoom, setzoom] = useState(15);
  const [map, setMap] = useState(null);
  const [sortByTimeOption, setsortByTimeOption] = useState(1);
  const [sortByTimeValue, setsortByTimeValue] = useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  const [complaintStatus, setcomplaintStatus] = useState({
    completed: true,
    notCompleted: true,
  });
  const [sortByAddessOption, setsortByAddessOption] = useState(1);
  const [sortByWardOption, setsortByWardOption] = useState(-1);
  const [geojson, setgeojson] = useState();
  const [citygeojson, setcitygeojson] = useState();
  const [showgeojson, setshowgeojson] = useState(false);
  const [activeWard, setactiveWard] = useState();

  const handleComplaintStatus = (e) => {
    setcomplaintStatus({
      ...complaintStatus,
      [e.target.name]: e.target.checked,
    });
  };

  console.log(activeMarker);

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
  async function getData() {
    const db = getFirestore(app);
    const q = query(collection(db, "Complaints"));

    const querySnapshot = await getDocs(q);
    setqueryData([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setqueryData((prev) => [...prev, { ...doc.data(), docID: doc.id }]);
      // console.log(doc.id, " => ", doc.data());
    });
  }

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

  useEffect(() => {
    getData();
  }, []);

  function getGeoJson() {
    fetch("/data/Municipal_Spatial/Pune/pune-electoral-wards_current.geojson")
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
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
      });
  }

  const filterGeoJSONByWardNo = (wardNo) => {
    const filteredData = [];
    citygeojson.map((shape, index) => {
      if (shape.properties["ward"] === wardNo) {
        filteredData.push(shape);
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
    var time1 = sortByTimeValue[0].unix();
    var time2 = sortByTimeValue[1].unix();
    if (complaintStatus.completed) {
      status.push("COMPLETED");
    }
    if (complaintStatus.notCompleted) {
      status.push("PENDING");
    }

    if (sortByTimeOption === "24 hours") {
      time1 = dayjs().subtract(1, "day").unix();
    } else if (sortByTimeOption === "2 days") {
      time1 = dayjs().subtract(2, "day").unix();
    } else if (sortByTimeOption === "4 days") {
      time1 = dayjs().subtract(4, "day").unix();
    } else if (sortByTimeOption === "1 week") {
      time1 = dayjs().subtract(1, "week").unix();
    }

    citygeojson.map((ward) => {
      if (ward.properties.ward === sortByWardOption)
        locations.push(ward.properties["name-mr"]);
    });
    const reqbody = {
      status: status,
      time1,
      time2,
      locations,
    };
    console.log({ reqbody });
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
        console.log({ data });
        setqueryData(data);
      });
  };

  console.log({ geojson });

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
                  gestureHandling: fullscreenHandle.active ? "greedy" : "auto",
                }}
              >
                <>
                  {queryData && (
                    <Map
                      data={queryData}
                      activeMarker={activeMarker}
                      setActiveMarker={setActiveMarker}
                      handleActiveMarker={handleActiveMarker}
                      activeWard={activeWard}
                      setactiveWard={setactiveWard}
                      geojson={geojson}
                      handleActiveWard={handleActiveWard}
                      showgeojson={showgeojson}
                      handlePolygonClick={handlePolygonClick}
                    />
                  )}
                </>
              </GoogleMap>
            )}
          </div>
          <div className="main-map-overlay">
            <div className="left-panel-main-parent">
              <div className="left-panel-row">
                <div className="left-panel-row-title">Complaint Status</div>
                <div className="left-panel-row-body">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
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
                          defaultChecked
                          name="notCompleted"
                          checked={complaintStatus.notCompleted}
                          onChange={handleComplaintStatus}
                          value={complaintStatus.notCompleted}
                        />
                      }
                      label="Not Completed"
                    />
                  </FormGroup>
                  <Button onClick={getNewData}>Get Data</Button>
                </div>
              </div>
              <div className="left-panel-row">
                <div
                  className="left-panel-row-title"
                  style={{ marginTop: "20px" }}
                >
                  Sort by Time
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
              <div className="left-panel-row">
                <div
                  className="left-panel-row-title"
                  style={{ marginTop: "20px" }}
                >
                  Sort by Location
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
                      }}
                    >
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
            </div>
            <div className="right-panel-main-parent">right hello</div>
          </div>
        </div>
      </FullScreen>

      <div>
        <button onClick={fullscreenHandle.enter}>Enter fullscreen</button>
      </div>
      {queryData && <ComplainCards data={queryData} />}
    </>
  );
}

export default Analytics;
