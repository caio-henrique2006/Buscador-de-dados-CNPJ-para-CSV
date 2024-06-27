/* public var */
var empresas = []

/* callback */
function csvBuild () {      
  var csv = 'cidade, estado, endereço, numero, nome fantasia, cnpj, email, telefone1, telefone2, razao_social\n';
  empresas.forEach(function(row) {
          csv += row.estabelecimento.cidade.nome;
          csv += ','+ row.estabelecimento.estado.nome;
          csv += ','+ row.estabelecimento.logradouro;
          csv += ','+ row.estabelecimento.numero;
          csv += ','+ row.estabelecimento.nome_fantasia;
          csv += ','+ row.estabelecimento.cnpj;
          csv += ','+ row.estabelecimento.email;
          csv += ','+ row.estabelecimento.telefone1;
          csv += ','+ row.estabelecimento.telefone2;
          csv += ','+ row.razao_social;
          csv += '\n';
  });
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'digiteumnome.csv';
  hiddenElement.click();
};

/* CNPJ */
document.getElementById("cnpj").addEventListener("click", () => {
  document.getElementById("state").innerText = "Iniciando o envio";
  var arr = []
  // Separando os cnpjs:
  const cnpj = document.getElementById("textarea").value;
  for (var i = 0; i < cnpj.length; i += 15) {
    arr.push(cnpj.slice(i, i+14));
  }
  // Contador da chegada dos dados:
  counter = 0;
  fetchCNPJ(arr, (obj) => {
    empresas.push(obj);
    counter += 1;
    document.getElementById("state").innerText = String(counter) + " de " + arr.length + " buscados";
    document.getElementById("stateTime").innerText = "Falta: " + Math.round((((21000 * (arr.length - counter))/1000)/60)) + " minutos";
    if (arr.length == counter) {
      document.getElementById("state").innerText = "Terminado";
      document.getElementById("csv").disabled = false;
    }
  });
  console.log(arr);
})

/* Download CSV */
document.getElementById("csv").addEventListener("click", () => {
  var _gerarCsv = csvBuild();
})

/* Fetch */
async function fetchCNPJ(cnpj, callback) {
    var cont = 0
    var timeout = 0;
    var response = [];
    cnpj.forEach((element) => {
        timeout += 21000; // 21 segundos
        setTimeout(() => {
            cont += 1;
            console.log(cont);
            const xhttp = new XMLHttpRequest();
            // Callback:
            xhttp.onload = function() {
                var res = this.response;
                response.push(JSON.parse(res));
                console.log(response);
                callback(JSON.parse(res));
            }
            // Requisitando getAPI.php:
            xhttp.open("GET", "CNPJ.php?data="+element);
            xhttp.send();
        }, timeout);
    })
}