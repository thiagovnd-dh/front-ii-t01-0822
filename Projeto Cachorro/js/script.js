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

async function carregarPorRaca(raca) {
    if(raca != "Escolha um cachorro ou raça") {
        const resposta = await fetch(`https://dog.ceo/api/breed/${raca}/images`);
        listaImagens = await resposta.json();
        // console.log(listaImagens.message);
    } else {
        return;
    }
    criarSlideShow(listaImagens.message);
    
}

function criarSlideShow (imagens) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${imagens[0]}');"></div>
    `
}