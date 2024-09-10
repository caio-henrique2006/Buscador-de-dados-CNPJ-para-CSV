export default class Render {
  UPDATE_TIME = 500; // ms
  api;

  constructor(api) {
    this.api = api;
  }

  dinamicTimer() {
    const timer_viewer = document.getElementById("timer_view");
    setInterval(() => {
      let timer = this.api.getTimeUntilEndOfFetch();
      if (timer <= 0) {
        timer_viewer.innerText = "Sem busca...";
      } else {
        timer_viewer.innerText = timer;
      }
    }, this.UPDATE_TIME);
  }

  dinamicAmountFetched() {
    const amount_fetched_viewer = document.getElementById("amount_fetched");
    setInterval(() => {
      let current_CNPJ_fetched = this.api.getAmountCurrentCNPJData();
      let CNPJ_to_be_fetched = this.api.getAmountToBeFetchedCNPJData();
      amount_fetched_viewer.innerText =
        current_CNPJ_fetched + "/" + CNPJ_to_be_fetched;
    }, this.UPDATE_TIME);
  }
}
