let botaoLogin = document.getElementById('botaoAcessar');

function exibeLoader() {
    let bolinha = document.createElement("div");
    bolinha.classList.add("loader");
    botaoLogin.innerHTML = "";
    botaoLogin.appendChild(bolinha);
}

function ocultaLoader() {
    botaoLogin.innerHTML = "";
}