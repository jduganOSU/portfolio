import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";

const defaultContainerStyle = {
  width: "100%",
  height: "500px"
};



const MapComponent = ({ latitude = 0, longitude = 0, zoom = 3, mapContainerStyle = defaultContainerStyle}) => {
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: latitude, lng: longitude})
  const [markerPosition, setMarkerPosition] = useState(null); // State variable to store marker position

  // INSERT LOGIC THAT TESTS IF THE LATITUDE AND LONGITDE ARE BOTH 0, 
  // IF THEY ARE, CALL SETMARKERPOSITION SO lat = latitude and lng = longitude
  useEffect(() => {
    if(latitude!== 0 && longitude !== 0){
      setMarkerPosition({
        lat: latitude, 
        lng: longitude
      });
    }
  }, [latitude, longitude]);
  // Update center state when props change
  useEffect (() => {
    setCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  // Handler to set the marker position when the map is clicked
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setMarkerPosition({
      lat: lat,
      lng: lng
    });

    navigate(`/individual/${lat}/${lng}`);
  };

  return (

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
      >

        {/* You can place markers or other components here */}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
  );
};

export default MapComponent;
