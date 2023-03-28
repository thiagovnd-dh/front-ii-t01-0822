//https://dog.ceo/api/breeds/list/all


//Maneira antiga de se fazer requisição Assíncrona
// fetch("https://dog.ceo/api/breeds/list/all").then(function (response) {
//     return response.json();
// }).then(function(data) {
//     console.log(data);
// })

async function puxarDados() {
    const resposta = await fetch("https://dog.ceo/api/breeds/list/all");
    const dados = await resposta.json();
    // console.log(dados);
    criarListaRacas(dados.message);
}

puxarDados();

function criarListaRacas(listaRacas) {
    document.getElementById("racas").innerHTML = `
        <select onchange = "carregarPorRaca(this.value)">
            <option>Escolha um cachorro ou raça</option>
            ${Object.keys(listaRacas).map(function (raca) {
                return `<option>${raca}</option>`
            }).join('')}
        </select>
    `;
}

function carregarPorRaca(raca) {
    if(raca != "Escolha um cachorro ou raça") {
        console.log(`Escolheu ${raca}`);
    } else {
        return;
    }
}