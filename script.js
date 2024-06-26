var empresas = []

function call(obj) {
  empresas.push(obj);
  console.log(empresas);
}

document.getElementById("cnpj").addEventListener("click", () => {
  /* AQUI */
  var cnpj = "2260436400020251526316000152125785180002771342064300013647325487000146204419720002001211419700017934297761000179190510230001531133169600015516883927000238271385890001455330279500015932642852000250546133310001262807677100018123923269000145"
  
  var arr = []
  for (var i = 0; i < cnpj.length; i += 14) {
    arr.push(cnpj.slice(i, i+14));
  }
  var response = fetchCNPJ(arr, call);
  console.log("Buscando");
})

document.getElementById("csv").addEventListener("click", () => {
  
  var _gerarCsv = function(){
        
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
      hiddenElement.download = 'produtos.csv';
      hiddenElement.click();
  };
  _gerarCsv();
})

async function fetchCNPJ(cnpj, callback) {
    var cont = 1
    var timeout = 0;
    var response = [];
    cnpj.forEach((element) => {
        timeout += 21000;
        setTimeout(() => {
            console.log("Opa tempo ", cont);
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