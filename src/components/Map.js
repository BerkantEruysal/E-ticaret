import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

/*const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { 
          lat: 39.0100655,
          lng: 30.6884859
      }
    },
    {
      id: 2,
      name: "Chicago, Illinois",
      position: { 
          lat: 39.2517353,
          lng: 34.5567558
      }
    }
];*/

function Map(props) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  let center = {
    lat: 39.0100655,
    lng: 30.6884859,
  };
  if (props.center) {
    center = props.center;
  }

  return (
    <GoogleMap
      zoom={5}
      center={center}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      {props.markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
