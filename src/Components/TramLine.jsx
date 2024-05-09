import { Polyline } from "react-leaflet";
import invertLatLon from "../scripts/invertLatLon";

function TramLine({ tramLine }) {

function getColor(){
 if (tramLine.name.includes("1")){
    return "#0c9144ff"
 } else if (tramLine.name.includes("2")){
    return "#d41f2eff"
 } else if (tramLine.name.includes("3")){
    return "#136ba8ff"
 } 
}

  return (
    <Polyline
      pathOptions={{ color: getColor(), weight: 4 }}
      positions={invertLatLon(tramLine.polylines)}
    />
  );
}

export default TramLine;
