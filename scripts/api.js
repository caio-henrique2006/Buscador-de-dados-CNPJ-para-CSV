export default class Api {
  data = [];
  time_fetch;

  async getCNPJData(cnpj_arr) {
    // for (const cnpj of cnpj_arr) {
    let url = "https://publica.cnpj.ws/cnpj/" + "04770773000108";
    const response = await fetch(url);
    console.log(response);
    // }
    return this.data;
  }

  clearCNPJData() {
    this.data = [];
  }
}
