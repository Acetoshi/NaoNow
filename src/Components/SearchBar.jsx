import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ tramStations }) {
  const [search, setSearch] = useState("");

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

  console.log(search);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        placeholder="Station de départ"
        id="station-search"
        list="suggested-stations"
        onChange={handleChange}
      ></input>
      <datalist id="suggested-stations">
        {getTramStationsNames().map((stationName) => (
          <option key={stationName} value={stationName}></option>
        ))}
      </datalist>
    </form>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  tramStations: PropTypes.array.isRequired,
};
