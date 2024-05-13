// Packages
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useTrams } from "../contexts/TramsProvider";

import "../styles/SearchBar.css";

function SearchBar() {
  const {
    tramStations,
    search,
    setSearch,
    setSelectedStation,
    setPanelIsDisplayed,
  } = useTrams();

  const favoriteStations = ["Commerce", "Gare Nord"];

  const [suggestionsIsVisible, setSuggestionsIsVisible] = useState(false);

  // This function filters the tram stations based on the search.
  // It ignores higher or lower case and accents.
  // It also sorts the result in alphabetical order
  const foundStations = tramStations
    .filter((station) =>
      removeAccents(station.libelle.toLowerCase()).includes(
        removeAccents(search.toLowerCase())
      )
    )
    .sort((stationA, stationB) =>
      stationA.libelle.localeCompare(stationB.libelle)
    );

  // this function comes from here : https://www.30secondsofcode.org/js/s/remove-accents/
  function removeAccents(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  const map = useMap();
  useEffect(() => {
    if (foundStations.length === 1) {
      map.setView(
        [foundStations[0].position.lat, foundStations[0].position.lon],
        16
      );
      setSelectedStation(() => foundStations[0]);
      setPanelIsDisplayed(() => true);

      // TODO find the station and focus it
      // document.getElementById("station-search").value=foundStations[0].libelle
    }
  }, [search]);

  return (
    <section
      id="form-wrapper"
      className={suggestionsIsVisible && "fullscreen"}
      onClick={(event) => {
        // this function enables us to collapse the suggestions if the user clicks somewhere else than in the search container
        const searchContainer = document.getElementById("search-container");
        if (!searchContainer.contains(event.target)) {
          setSuggestionsIsVisible(() => false);
        }
      }}
    >
      <form onSubmit={(event) => event.preventDefault()} id="search-container">
        <input
          type="text"
          placeholder="Station de départ"
          autoComplete="off"
          id="station-search"
          list="suggested-stations"
          onChange={handleChange}
          value={search}
          onFocus={() => {
            setSuggestionsIsVisible(() => true);
            setPanelIsDisplayed(() => false);
          }}
        ></input>
        <ol
          id="suggested-stations"
          className={!suggestionsIsVisible && "hidden"}
        >
          {search === "" &&
            favoriteStations &&
            favoriteStations.map((favoriteStation) => (
              <li key={favoriteStation}>
                <button
                  type="button"
                  onClick={() => setSearch(favoriteStation)}
                >
                  {favoriteStation}
                </button>
              </li>
            ))}
          {foundStations.length > 0 ? (
            foundStations.map((station) => (
              <li key={station.libelle}>
                <button
                  type="button"
                  onClick={() => {
                    setSearch(station.libelle);
                    setSuggestionsIsVisible(() => false);
                  }}
                >
                  {station.libelle}
                </button>
              </li>
            ))
          ) : (
            <li key={"no result"}>aucune station trouvée</li>
          )}
        </ol>
      </form>
    </section>
  );
}

export default SearchBar;
