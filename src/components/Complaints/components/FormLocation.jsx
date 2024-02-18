import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Button from "@mui/material/Button";

const FormLocation = (props) => {
  const { loc, handleLocationChange } = props;
  console.log("rendering form location");
  function Map() {
    console.log("rendered Map");
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <ChildMap />;
  }

  function ChildMap() {
    const center = useMemo(
      () => ({ lat: loc.latitude, lng: loc.longitude }),
      []
    );
    console.log("rendered Child Map");
    return (
      <GoogleMap zoom={15} center={center} mapContainerClassName="gmap-form">
        <Marker position={center} />
      </GoogleMap>
    );
  }

  var mapoptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    var data = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        crd.latitude +
        "," +
        crd.longitude +
        "&key=" +
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    );
    var datajson = await data.json();
    // console.log(datajson.results[0].address_components);
    var address = datajson.results[0].address_components;
    console.log(address);
    let country = null,
      state = null,
      city = null,
      lvl3 = null,
      locality = null,
      postalcode = null;
    for (let el in address) {
      if (address[el].types.includes("country")) {
        country = address[el].long_name;
      } else if (address[el].types.includes("administrative_area_level_1")) {
        state = address[el].long_name;
      } else if (address[el].types.includes("administrative_area_level_2")) {
        city = address[el].long_name;
      } else if (address[el].types.includes("administrative_area_level_3")) {
        lvl3 = address[el].long_name;
      } else if (address[el].types.includes("locality")) {
        locality = address[el].long_name;
      } else if (address[el].types.includes("postal_code")) {
        postalcode = address[el].long_name;
      }
    }
    if (city === null) {
      city = lvl3;
    }
    if (city === null) {
      city = locality;
    }
    handleLocationChange({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy,
      postalcode: postalcode,
      city: city,
      state: state,
      country: country,
    });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async function getLocation() {
    console.log("getting location");
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              success,
              errors,
              mapoptions
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }
  return (
    <div className="field">
      <label htmlFor="loc">
        Location
        <span className="required-star" style={{ color: "red" }}>
          *
        </span>
      </label>
      <br />
      {/* <button type="button" onClick={()=>getLocation()} id="locbutton">Get current location</button> */}

      <Button variant="contained" onClick={() => getLocation()} id="locbutton">
        Get current location
      </Button>
      <div className="map-data-parent">
        {loc.latitude ? <Map /> : <></>}
        <p id="getLoc">
          {!loc.latitude ? (
            <span>
              Please click the above button to give your current location
            </span>
          ) : (
            <span>
              Latitude: {loc.latitude} <br /> Longitude: {loc.longitude} <br />{" "}
              Accuracy: {loc.accuracy} meters{" "}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default React.memo(FormLocation);
