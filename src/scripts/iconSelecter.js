import L from "leaflet";
import line1Icon from "../assets/icons/Line1_Station.png";
import line2Icon from "../assets/icons/Line2_Station.png";
import line3Icon from "../assets/icons/Line3_Station.png";
import line23Icon from "../assets/icons/Line23_Station.png";

function iconSelecter(lineNumber) {
  let icon = "";

  if (lineNumber === 1) {
    icon = line1Icon;
  } else if (lineNumber === 2) {
    icon = line2Icon;
  } else if (lineNumber === 23) {
    icon = line23Icon;
  } else {
    icon = line3Icon;
  }

  return L.icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default iconSelecter;
