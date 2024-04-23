import { useState, useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import getNextTrams from "../scripts/getNextTram";
import L from 'leaflet';
import line1Icon from '../assets/icons/Line1_Station.png'


const iconLine1 = L.icon({
  iconUrl: line1Icon,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function TramStation({ station }) {
  const [nextTrams, setNextTrams] = useState(null);

  useEffect(() => {
    getNextTrams(station.codeLieu, setNextTrams);
  }, []);

  if (nextTrams) console.log(nextTrams);

  return (
    <Marker position={[station.position.lat, station.position.lon]} icon={iconLine1}>
      <Popup>
        <h3>{station.libelle}</h3>
       
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
