import axios from "axios";

function getNextTrams(id, setState) {
  axios
    .get(`https://open.tan.fr/ewp/tempsattente.json/${id}`)
    .then((response) => {
      const nextTrams = response.data.filter(
        (tram) => tram.tempsReel && tram.ligne.typeLigne == 1
      );
      nextTrams.sort((tramA, tramB) =>
        tramA.sens - tramB.sens > 0 ? true : false
      );
      setState(nextTrams);
    });
}

export default getNextTrams;
