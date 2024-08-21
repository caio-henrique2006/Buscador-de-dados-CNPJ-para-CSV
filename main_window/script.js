import Api from "../scripts/api.js";

async function teste() {
  const api = new Api();
  const response = await api.getCNPJData(["04770773000108"]);
  console.log(response);
}
teste();
