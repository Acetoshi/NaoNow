import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import "./App.css";
import getTramStops from "./scripts/getTramStops";

function App() {
  const [tramLines, setTramLines] = useState([]);
  const [stops, setStops] = useState([]);
  const [tramStops, setTramStops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const stations = await getTramStops();
      setTramStops(stations);
    }
    fetchData();
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {tramStops.length && tramStops.map((stop) => (
          <Marker position={[stop.position.lat, stop.position.lon]}>
            <Popup>Pascal {stop.libelle}</Popup>
          </Marker>
        ))}
        ;
      </MapContainer>
    </>
  );
}

export default App;
