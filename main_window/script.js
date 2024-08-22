import Api from "../scripts/api.js";

const api = new Api();

window.onload = () => {
  const timer_view = document.getElementById("timer_view");
  const amount_fetched = document.getElementById("amount_fetched");
  setInterval(() => {
    let timer = api.getTimeUntilEndOfFetch();
    let current_CNPJ_fetched = api.getAmountCurrentCNPJData();
    let CNPJ_to_be_fetched = api.getAmountToBeFetchedCNPJData();
    if (timer <= 0) {
      timer_view.innerText = "Sem busca...";
    } else {
      timer_view.innerText = timer;
    }
    amount_fetched.innerText = current_CNPJ_fetched + "/" + CNPJ_to_be_fetched;
  }, 500);
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
