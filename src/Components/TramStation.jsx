import { useState,useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import getStationWaitTime from "../scripts/getStationWaitTime";
import axios from "axios";

function TramStation({ station }) {
  const [nextTrams, setNextTrams] = useState(null);


  function getNextTrams(id) {
    axios
      .get(`https://open.tan.fr/ewp/tempsattente.json/${id}`)
      .then((response) => {
        setNextTrams(response.data);
      });
  }

  useEffect(()=>{
    getNextTrams(station.codeLieu)
  },[])
  



  if (nextTrams) console.log(nextTrams[0]);


  return (
    <Marker position={[station.position.lat, station.position.lon]}>
      <Popup>
        {station.libelle}
        <button
          type="button"
          onClick={() => getNextTrams(station.codeLieu)}
        >
          refresh
        </button>
        <p>
          next tram : {nextTrams ? nextTrams[0].terminus+" in "+nextTrams[0].temps : "no info to display"}
        </p>
      </Popup>
    </Marker>
  );
}

export default TramStation;
