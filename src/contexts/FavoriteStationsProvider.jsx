import { createContext, useContext, useState } from "react";

const FavoriteStationsContext = createContext();

function FavoriteStationProvider({ children }) {
  const [favoriteStations, setFavoriteStations] = useState([]);

  function isFavorite(station) {
    if (station) {
      return favoriteStations.some(
        (stationName) => stationName === station.libelle
      );
    } else {
      return false;
    }
  }

  function addToFavorites(station) {
    if (!isFavorite(station)) {
      setFavoriteStations((prevFavoriteStations) => [
        ...prevFavoriteStations,
        station.libelle,
      ]);
    }
  }

  function removeFromFavorites(station) {
    setFavoriteStations((prevFavoriteStations) =>
      [...prevFavoriteStations].filter((el) => el !== station.libelle)
    );
  }

  return (
    <FavoriteStationsContext.Provider
      value={{
        favoriteStations,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoriteStationsContext.Provider>
  );
}

export default FavoriteStationProvider;

export const useFavoriteStations = () => useContext(FavoriteStationsContext);
