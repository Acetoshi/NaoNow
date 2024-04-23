import { useState, useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import getNextTrams from "../scripts/getNextTram";

function TramStation({ station }) {
  const [nextTrams, setNextTrams] = useState(null);

  useEffect(() => {
    getNextTrams(station.codeLieu, setNextTrams);
  }, []);

  if (nextTrams) console.log(nextTrams);

  return (
    <Marker position={[station.position.lat, station.position.lon]}>
      <Popup>
        {station.libelle}
        <button
          type="button"
          onClick={() => getNextTrams(station.codeLieu, setNextTrams)}
        >
          refresh
        </button>
        {nextTrams ? (
          <ul>
            {nextTrams.map(tram => {
              return (
                <p>{tram.terminus + " : " + tram.temps}</p>
              );
            })}
          </ul>
        ) : (
          <p>no info to display, press refresh</p>
        )}
      </Popup>
    </Marker>
  );
}

export default TramStation;
