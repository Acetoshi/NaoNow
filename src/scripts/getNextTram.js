import axios from "axios";

function getNextTrams(id, setState) {
  axios
    .get(`https://open.tan.fr/ewp/tempsattente.json/${id}`)
    .then((response) => {
      const nextTrams = response.data.filter(
        (tram) =>
          (tram.tempsReel==="true") &&
          (tram.ligne.numLigne === "1" ||
            tram.ligne.numLigne === "2" ||
            tram.ligne.numLigne === "3")
      );
      nextTrams.sort((tramA, tramB) =>
        tramA.sens - tramB.sens > 0 ? true : false
      );
      setState(nextTrams);
    });
}

export default getNextTrams;
