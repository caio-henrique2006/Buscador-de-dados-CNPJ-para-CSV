/**
 * Handles the loading event of the page
 * Handles the button events of the events
 *  */

import Api from "../scripts/api.js";
import Render from "../scripts/render.js";

const api = new Api();
const render = new Render(api);

window.onload = () => {
  render.dinamicTimer();
  render.dinamicAmountFetched();
};

document.getElementById("btn_fetch_data").addEventListener("click", () => {
  let cnpj_list = [
    "03912777000382",
    "11617429000149",
    "11350590000107",
    "13852548000101",
  ];
  api.startFetchOfCNPJData(cnpj_list);
});

document.getElementById("btn_view_data").addEventListener("click", () => {
  console.log(api.getCurrentCNPJData());
  console.log(api.getTimeUntilEndOfFetch());
});

document.getElementById("btn_stop_fetch").addEventListener("click", () => {
  api.stopDataFetching();
});
