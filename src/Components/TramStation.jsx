import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Popup, Marker, useMap } from "react-leaflet";
import getNextTrams from "../scripts/getNextTram";
import iconSelecter from "../scripts/iconSelecter";

function TramStation({ station }) {
  const [nextTrams, setNextTrams] = useState(null);

  useEffect(() => {
    getNextTrams(station.codeLieu, setNextTrams);
  }, []);

  let ligne = 0;
  if (
    station.ligne.some((el) => el.numLigne === "2") &&
    station.ligne.some((el) => el.numLigne === "3")
  ) {
    ligne = 23;
  } else if (station.ligne.some((el) => el.numLigne === "2")) {
    ligne = 2;
  } else if (station.ligne.some((el) => el.numLigne === "3")) {
    ligne = 3;
  } else if (station.ligne.some((el) => el.numLigne === "1")) {
    ligne = 1;
  }
  const map = useMap();
  function zoomOnStation() {
    map.setView([station.position.lat, station.position.lon], 16);
    getNextTrams(station.codeLieu, setNextTrams);
  }

  return (
    <Marker
      position={[station.position.lat, station.position.lon]}
      icon={iconSelecter(ligne)}
      alt={station.libelle}
      eventHandlers={{
        click: zoomOnStation,
      }}
    >
      <Popup>
        <h3>{station.libelle}</h3>

        {nextTrams ? (
          <ul>
            {nextTrams.map((tram, index) => {
              return (
                <li key={station.codeLieu + index}>
                  <p>{tram.terminus + " : " + tram.temps}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>no info to display, press refresh</p>
        )}
        <button
          type="button"
          onClick={() => getNextTrams(station.codeLieu, setNextTrams)}
        >
          refresh
        </button>
      </Popup>
    </Marker>
  );
}

export default TramStation;

TramStation.propTypes = { station: PropTypes.object.isRequired };
