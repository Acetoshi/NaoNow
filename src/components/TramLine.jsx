import { Polyline } from "react-leaflet";
import PropTypes from "prop-types";
import invertLatLon from "../scripts/invertLatLon";

function TramLine({ tramLine }) {

  return (
    <Polyline
      pathOptions={{ color: tramLine.color, weight: 4 }}
      positions={invertLatLon(tramLine.polylines)}
    />
  );
}

TramLine.propTypes = {
  tramLine: PropTypes.object.isRequired,
};

export default TramLine;
