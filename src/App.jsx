import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "./App.css";
import TramStation from "./Components/TramStation";
import tramStations from "./scripts/tramStations.json";
import { ligne1, ligne2 } from "./scripts/tramPolylines";

function App() {
  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ul>
          {tramStations.map((station) => (
            <li key={station.codeLieu}>
              <TramStation station={station} />
            </li>
          ))}
        </ul>
        <Polyline
          pathOptions={{ color: "#0c9144ff", weight: 16 }}
          positions={ligne1}
        />
        <Polyline
          pathOptions={{ color: "#0c9144ff", weight: 16 }}
          positions={ligne2}
        />
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
