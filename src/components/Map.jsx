import { MapContainer, TileLayer } from "react-leaflet";
import { useTrams } from "../contexts/TramsProvider";
import TramStation from "./TramStation";
import TramLine from "./TramLine";
import MapMover from "./MapMover";

export default function Map() {
  const { tramStations, tramLines } = useTrams();

  return (
    <MapContainer center={[47.216671, -1.55]} zoom={14}>
      <MapMover />
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
  );
}
