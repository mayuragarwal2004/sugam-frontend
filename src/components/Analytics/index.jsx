import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Analytics = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const center = useMemo(() => ({ lat: 18.4807627, lng: 73.8724301 }), []);
  return (
    <div>
      <div className="maps-body-gmap">
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <GoogleMap
            zoom={13}
            center={center}
            mapContainerClassName="gmap"
            // onClick={() => setActiveMarker(null)}
            fullscreenControl={true}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            //   gestureHandling: fullscreenHandle.active ? "greedy" : "auto",
            }}
          >
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Analytics;
