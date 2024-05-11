import PropTypes from "prop-types";
import { Marker, useMap, Tooltip } from "react-leaflet";
import { useTrams } from "../contexts/TramsProvider";
import iconSelecter from "../scripts/iconSelecter";

function TramStation({ station }) {
  const { selectedStation, setSelectedStation, setPanelIsDisplayed } =
    useTrams();

    //this could be refactored.
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
    setSelectedStation(station);
    setPanelIsDisplayed(true);
    // console.log("was selected : ", this);
    // this.Tooltip.openTooltip();
  }

  // TODO : find a way to make the tooltip permanent when station is selected. 
  // const isSelected = selectedStation.codeLieu === station.codeLieu;
  // if (isSelected) {
  //   console.log(isSelected);
  // }

  return (
    <Marker
      position={[station.position.lat, station.position.lon]}
      icon={iconSelecter(ligne)}
      alt={station.libelle}
      eventHandlers={{
        click: zoomOnStation,
      }}
    >
      <Tooltip direction="top" offset={[0, -16]}>
        {station.libelle}
      </Tooltip>
    </Marker>
  );
}

export default TramStation;

TramStation.propTypes = { station: PropTypes.object.isRequired };
