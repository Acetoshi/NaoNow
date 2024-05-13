import { useState, useEffect } from "react";
import { useTrams } from "../contexts/TramsProvider";
import getNextTrams from "../scripts/getNextTram";
import "../styles/InfoPanel.css";

function InfoPanel() {
  const { panelIsDisplayed, setPanelIsDisplayed, selectedStation } = useTrams();
  const [nextTrams, setNextTrams] = useState(null);

  useEffect(() => {
    selectedStation && getNextTrams(selectedStation.codeLieu, setNextTrams);
  }, [selectedStation]);

  return (
    <section className={panelIsDisplayed ? "info-panel" : "info-panel hidden"}>
      <section>
        <hgroup>
          <h3>
            {selectedStation
              ? selectedStation.libelle
              : "selectionnez une station"}
          </h3>

          <button
            type="button"
            onClick={() => getNextTrams(selectedStation.codeLieu, setNextTrams)}
          >
            rafraîchir
          </button>
        </hgroup>

        {nextTrams ? (
          <ul>
            {nextTrams.map((tram, index) => {
              return (
                <li key={selectedStation.codeLieu + index}>
                  <p>
                    <strong
                      className={`ligne-${tram.ligne.numLigne} ligne-terminus-info`}
                    >{`Ligne ${tram.ligne.numLigne} > ${tram.terminus}`}</strong>
                    {tram.temps === "proche" ? ` tram ` : ` tram dans `}{" "}
                    <strong>{tram.temps}</strong>
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>no info to display, press refresh</p>
        )}
      </section>
      <button
        onClick={() => setPanelIsDisplayed(false)}
        type="button"
        aria-label="Close panel"
        className="close-panel-button"
      >
        <span aria-hidden="true">×</span>
      </button>
    </section>
  );
}

export default InfoPanel;
