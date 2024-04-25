import tramStations from "./tramStations.json";

function getPosition(stationId) {

  const station = tramStations.filter(
    (station) => station.codeLieu == stationId
  );

  return [station[0].position.lat,station[0].position.lon];
}

export default getPosition;
