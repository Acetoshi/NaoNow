import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import TramStation from "./Components/TramStation";
import tramStations from "./scripts/tramStations.json";
import TramLine from "./Components/TramLine";
import tramLines from "./scripts/tramLines.json";

function App() {
  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ul className="tram-stations">
          {tramStations.map((station) => (
            <li key={station.codeLieu}>
              <TramStation station={station} />
            </li>
          ))}
        </ul>

        <ul className="tram-lines">
          {tramLines.map((tramLine) => (
            <li key={tramLine.name}>
              <TramLine tramLine={tramLine} />
            </li>
          ))}
        </ul>
      </MapContainer>

      <footer>
        <p>
          Developped by{" "}
          <a href="https://fr.linkedin.com/in/davidlegall" target="blank">
            David LE GALL
          </a>{" "}
          using data from{" "}
          <a
            href="https://data.nantesmetropole.fr/explore/dataset/244400404_api-temps-reel-tan/information/"
            target="blank"
          >
            Nantes OpenData
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
