import React, { useMemo, useState, useEffect } from "react";
import Map from "./components/Map";
import "./analytics.css";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { GoogleMap, useLoadScript, PolygonF } from "@react-google-maps/api";
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
  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  const [sortByTimeOption, setsortByTimeOption] = useState(1);
  const [complaintStatus, setcomplaintStatus] = useState({
    completed: true,
    notCompleted: true,
  });
  const [sortByAddessOption, setsortByAddessOption] = useState(1);
  const [geojson, setgeojson] = useState();

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
        console.log(data);
        setgeojson(data);
      });
  }

  useEffect(() => {
    getGeoJson();
  }, []);

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
                  {geojson &&
                    geojson.features.map((shape) => (
                      <PolygonF paths={shape.geometry.coordinates} />
                    ))}
                  {queryData && (
                    <Map
                      data={queryData}
                      activeMarker={activeMarker}
                      setActiveMarker={setActiveMarker}
                      handleActiveMarker={handleActiveMarker}
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
                      <MenuItem value={1}>Last 24 hours</MenuItem>
                      <MenuItem value={2}>Last 2 day</MenuItem>
                      <MenuItem value={3}>Last 4 days</MenuItem>
                      <MenuItem value={4}>Last 1 week</MenuItem>
                      <MenuItem value={5}>Custom Time Input</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {sortByTimeOption === 5 && (
                        <DemoContainer
                          components={["DateRangePicker", "DateRangePicker"]}
                        >
                          <DemoItem
                            label="Choose Date Range"
                            component="DateRangePicker"
                          >
                            <DateRangePicker
                              value={value}
                              onChange={(newValue) => setValue(newValue)}
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
                      onChange={(e) => setsortByAddessOption(e.target.value)}
                    >
                      <MenuItem value={1}>Ward</MenuItem>
                      <MenuItem value={2}>City</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth style={{ marginTop: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Choose Ward
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sortByAddessOption}
                      label="Choose Ward"
                      onChange={(e) => setsortByAddessOption(e.target.value)}
                    >
                      <MenuItem value={1}>Ward</MenuItem>
                      <MenuItem value={2}>City</MenuItem>
                    </Select>
                  </FormControl>
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
