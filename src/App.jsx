import InfoPanel from "./components/InfoPanel";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import TramsProvider from "./contexts/TramsProvider";

import "./styles/App.css";

function App() {
  return (
    <>
      <TramsProvider>
        <SearchBar />
        <Map />
        <InfoPanel />
      </TramsProvider>
      <footer>
        <p>
          Developped by{" "}
          <a href="https://fr.linkedin.com/in/davidlegall" target="blank">
            David LE GALL
          </a>{" "}
          using data from{" "}
          <a
            href="https://data.nantesmetropole.fr/explore/dataset/244400404_api-temps-reel-tan/information/"
            target="blank"
          >
            Nantes OpenData
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
