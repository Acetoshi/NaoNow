import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useTrams } from "../contexts/TramsProvider";

//this component exists only in order for the map to be moved whenever the selected station state changes.

export default function MapMover() {
  const { selectedStation } = useTrams();
  const map = useMap();

  useEffect(() => {
    if (selectedStation.position) {
      map.setView(
        [selectedStation.position.lat, selectedStation.position.lon],
        16
      );
    }
  }, [map, selectedStation]);
  return <></>;
}
