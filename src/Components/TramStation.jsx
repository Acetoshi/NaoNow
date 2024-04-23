import { Popup, Marker } from "react-leaflet";
import getStationWaitTime from "../scripts/getStationWaitTime";


function TramStation({station}) {
    console.log(station)
  return (
    <Marker position={[station.position.lat, station.position.lon]}>
      <Popup>
        {station.libelle}
        <button
          type="button"
          onClick={() => console.log(getStationWaitTime(station.codeLieu))}
        >
          refresh
        </button>
      </Popup>
    </Marker>
  );
}

export default TramStation
