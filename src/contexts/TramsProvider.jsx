import { createContext, useContext, useState } from "react";
import tramStations from "../scripts/tramStations.json";

const TramsContext = createContext();

function TramsProvider({ children }) {
  const [panelIsDisplayed, setPanelIsDisplayed] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStation, setSelectedStation] = useState({});

  return (
    <TramsContext.Provider
      value={{
        tramStations,
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

export default TramsProvider;
