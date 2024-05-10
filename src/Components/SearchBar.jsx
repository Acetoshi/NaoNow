import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";
import "../styles/SearchBar.css"

function SearchBar({ tramStations }) {
  const [search, setSearch] = useState("");
  const foundStations = tramStations.filter((station) => station.libelle.toLowerCase().includes(search.toLowerCase()))

  function getTramStationsNames() {
    const tramStationsNames = [];
    for (const station of tramStations) {
      tramStationsNames.push(station.libelle);
    }
    return tramStationsNames;
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  const map = useMap();
  useEffect(() => {
    if (foundStations.length === 1) {
        map.setView([foundStations[0].position.lat, foundStations[0].position.lon], 16);
    }
  }, [search]);

  return (
    <form onSubmit={(event) => event.preventDefault()} className="search-container">
      <input
        type="text"
        placeholder="Station de départ"
        id="station-search"
        list="suggested-stations"
        onChange={handleChange}
      ></input>
      <datalist id="suggested-stations">
        {foundStations.map((station) => (
          <option key={station.libelle} value={station.libelle}></option>
        ))}
      </datalist>
    </form>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  tramStations: PropTypes.array.isRequired,
};
