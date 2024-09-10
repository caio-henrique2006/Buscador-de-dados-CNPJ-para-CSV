export default class Api {
  /* 
    The Public API which we are using has a limit of 3 request per minute.
    So each fetch is made in 21 seconds (21000 miliseconds) for safety
  */
  #TIME_FOR_EACH_FETCH = 21000;
  #UPDATE_TIMER = 1000;
  #ARR_FETCH_TIMEOUT_IDS = [];
  #ARR_TIMER_TIMEOUT_IDS = [];
  #time_until_end_of_fetch = 0;
  #amount_CNPJ = 0;
  #CNPJ_data = [];

  getCurrentCNPJData() {
    return this.#CNPJ_data;
  }

  getAmountToBeFetchedCNPJData() {
    return this.#amount_CNPJ;
  }

  getAmountCurrentCNPJData() {
    return this.#CNPJ_data.length;
  }

  getTimeUntilEndOfFetch() {
    return this.#time_until_end_of_fetch;
  }

  clearCNPJData() {
    this.#CNPJ_data = [];
  }

  clearTimeUntilEndOfFetch() {
    this.#time_until_end_of_fetch = 0;
  }

  clearAmountToBeFetched() {
    this.#amount_CNPJ = 0;
  }

  async startFetchOfCNPJData(cnpj_arr) {
    this.clearCNPJData();
    this.clearAmountToBeFetched();
    this.clearTimeUntilEndOfFetch();
    this.#amount_CNPJ = cnpj_arr.length;
    for (const cnpj of cnpj_arr) {
      this.#time_until_end_of_fetch += this.#TIME_FOR_EACH_FETCH;
      const fetch_timeout_id = setTimeout(async () => {
        let url = "https://publica.cnpj.ws/cnpj/" + cnpj;
        let data = await this.#fetchData(url);
        this.#CNPJ_data.push(data);
      }, this.#time_until_end_of_fetch);
      this.#ARR_FETCH_TIMEOUT_IDS.push(fetch_timeout_id);
    }
    this.handleTimeUntilEndOfFetch();
  }

  async handleTimeUntilEndOfFetch() {
    const timer_timeout_id = setInterval(() => {
      this.#time_until_end_of_fetch -= this.#UPDATE_TIMER;
    }, this.#UPDATE_TIMER);
    this.#ARR_TIMER_TIMEOUT_IDS.push(timer_timeout_id);
  }

  async stopDataFetching() {
    this.#ARR_FETCH_TIMEOUT_IDS.map((id) => {
      clearTimeout(id);
    });
    this.#ARR_TIMER_TIMEOUT_IDS.map((id) => {
      clearTimeout(id);
    });
  }

  async #fetchData(url) {
    const response = await fetch(url);
    const json_data = await response.json();
    return json_data;
  }
}
