let jwt;

onload = () => {
    jwt = sessionStorage.getItem("jwt");
    
    // Simulação da validação
    if(!jwt){
        alert("Você não está logado, página indisponível");
        window.location = "index.html";
    } else {
        //O usuário tem um token JWT na memória
        // buscaUsuarioNaApi(jwt);
        buscaUsuarioNaApiAssincrono();
    }
}

function buscaUsuarioNaApi(tokenJwtArmazenado) {
    let configuracoesRequisicao = {
        // method: 'GET', // Não é necessário escrever o GET
        headers: {
          'authorization' : tokenJwtArmazenado
        },
      }
    fetch(`${apiBaseUrl()}/users/getMe`, configuracoesRequisicao)
    .then( (resposta) => {
        /* Verifica status de sucesso na execução da promisse */
        // console.log(resposta);

        if(resposta.status == 201 || resposta.status == 200){
            return resposta.json();
        } else {
            // alert("Servidor não está respondendo");
            // window.location = "index.html";
            throw resposta;
        }   
        console.log(resposta);
    }).then((dados) => {
        renderizaNomeUsuario(dados);
    }).catch (error => {
        console.log('Servidor não está respondendo');
    })
}

function renderizaNomeUsuario(usuario) {
    nomeUsuarioTela = document.getElementById('nomeUsuario');
    nomeUsuarioTela.innerText = `${usuario.firstName} ${usuario.lastName}`;
}

//Await e Assync
async function buscaUsuarioNaApiAssincrono() {
    let configuracoesRequisicao = {
        // method: 'GET', // Não é necessário escrever o GET
        headers: {
          'authorization' : jwt
        },
      }
    let resposta = await fetch(`${apiBaseUrl()}/users/getMe`, configuracoesRequisicao);
    let dados = await resposta.json();
    console.log(dados.firstName);
    renderizaNomeUsuario(dados);
}