import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import tramLines from "../scripts/tramLines.json";
import tramStations from "../scripts/tramStations.json";

const TramsContext = createContext();

function TramsProvider({ children }) {
  const [panelIsDisplayed, setPanelIsDisplayed] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStation, setSelectedStation] = useState({});

  return (
    <TramsContext.Provider
      value={{
        tramStations,
        tramLines,
        search,
        setSearch,
        panelIsDisplayed,
        setPanelIsDisplayed,
        selectedStation,
        setSelectedStation,
      }}
    >
      {children}
    </TramsContext.Provider>
  );
}

export const useTrams = () => useContext(TramsContext);

TramsProvider.propTypes = {
  children: PropTypes.array,
};

export default TramsProvider;
