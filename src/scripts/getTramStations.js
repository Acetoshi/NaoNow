async function getTramStations() {
  const allStations = await fetchAllStations();

  const tramStations = allStations.filter((station) => {
    for (const el of station.ligne) {
      if (el.numLigne === "1" || el.numLigne === "2" || el.numLigne === "3") {
        return true;
      }
    }
    return false;
  });

  for (let i = 0; i < tramStations.length; i++) {
    const tramStationWithPosition = await fetchPositionByIdentifier(
      tramStations[i].codeLieu
    );
    tramStations[i] = {
      ...tramStations[i],
      position: tramStationWithPosition.results[0].stop_coordinates,
    };
  }

  return tramStations;
}

async function fetchAllStations() {
  return fetch("https://open.tan.fr/ewp/arrets.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Return the array of tram stations
      return data;
    })
    .catch((error) => {
      console.error(
        "Error calling https://open.tan.fr/ewp/arrets.json:",
        error
      );
      throw error;
    });
}

async function fetchPositionByIdentifier(id) {
  return fetch(
    `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-arrets/records?where=stop_id%3D%22${id}%22&limit=20`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Return the array of tram stations
      return data;
    })
    .catch((error) => {
      console.error(
        "Error calling data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-arrets:",
        error
      );
      throw error;
    });
}

export default getTramStations;
