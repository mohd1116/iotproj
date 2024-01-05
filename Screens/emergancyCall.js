// import React, { useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const center = {
//   lat: 40.99069595336914,
//   lng: 28.797225952148438,
// };

// export default function Intro() {
//   const [open, setOpen] = useState(false);

//   const onMarkerClick = () => {
//     setOpen(true);
//   };

//   const onCloseClick = () => {
//     setOpen(false);
//   };

//   return (
//     <LoadScript googleMapsApiKey={"AIzaSyCu1N7Bs0vFPm1_qBiE9VR2citXSrES6zs"}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={14}
//         center={center}
//       >
//         <Marker position={center} onClick={onMarkerClick} />

//         {open && (
//           <InfoWindow position={center} onCloseClick={onCloseClick}>
//             <p>My location</p>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

export default function Intro() {
  const [center, setCenter] = useState({ lat: 40.9906, lng: 28.7972 });
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(currentLocation);

          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
              params: {
                location: `${currentLocation.lat},${currentLocation.lng}`,
                radius: 1000,
                type: "restaurant",
                key: "AIzaSyCu1N7Bs0vFPm1_qBiE9VR2citXSrES6zs",
              },
            }
          );

          if (response.data.status === "OK") {
            setPlaces(response.data.results);
          }
        },
        (err) => console.error(err)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const onMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCu1N7Bs0vFPm1_qBiE9VR2citXSrES6zs">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            onClick={() => onMarkerClick(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat,
              lng: selectedPlace.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
