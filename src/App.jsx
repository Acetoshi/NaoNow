import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import getTramStations from "./scripts/getTramStations";
import TramStation from "./Components/TramStation";

function App() {
  const [tramStations, setTramStations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const stations = await getTramStations();
      setTramStations(stations);
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

        {tramStations.length && tramStations.map((station) => (
          <TramStation station={station}/>

        ))}
        ;
      </MapContainer>
    </>
  );
}

export default App;
