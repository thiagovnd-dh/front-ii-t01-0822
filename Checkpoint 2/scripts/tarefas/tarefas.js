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
        buscaTarefasApi()
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
      try {
        let resposta = await fetch(`${apiBaseUrl()}/users/getMe`, configuracoesRequisicao);
        let dados = await resposta.json();
        console.log(dados.firstName);
        renderizaNomeUsuario(dados);
      } catch (error) {
        console.log(erro);
      }
    
}

async function buscaTarefasApi() {
    let configuracoesRequisicao = {
        // method: 'GET', // Não é necessário escrever o GET
        headers: {
            'authorization' : jwt
        },
    }
    let resposta  = await fetch(`${apiBaseUrl()}/tasks`, configuracoesRequisicao)
    let dados = await resposta.json();
    rederizaTarefas(dados)
}

let listaTarefasGlobal = [];

function rederizaTarefas(listaTarefas) {
    listaTarefasGlobal = listaTarefas;
    
    let tarefasPendentesDom = document.querySelector(".tarefas-pendentes");

    for(let tarefa of listaTarefas) {
        if(!tarefa.completed) {
            //Tarefas Pendentes
            let li = document.createElement('li');
            li.classList.add("tarefa");
            li.innerHTML = `
                <div class="not-done"></div>
                    <div class="descricao">
                    <p class="nome">${tarefa.description}</p>
                    <p class="timestamp">${tarefa.createdAt}</p>
                </div>
            `;
            tarefasPendentesDom.appendChild(li);
        }
        else{
            //Tarefas Completas
        }
    }
}

// Cadastra nova tarefa
let botaoCadastrar = document.getElementById('botaoCriarTarefa');

botaoCadastrar.addEventListener('click', evento => {
    evento.preventDefault();
    let descricaoTarefa = document.getElementById('novaTarefa');
    if(descricaoTarefa.value != "") {
        console.log('A tarefa não está vazia');
        //Adiconar a tarefa na API

        let corpoDaRequisicao = {
            "description": descricaoTarefa.value,
            "completed": false
        }
        let configuracoesRequisicao = {
            method: 'POST',
            body: JSON.stringify(corpoDaRequisicao),
            headers: {
                'Content-type': 'application/json',
                'authorization' : jwt
            },
        }
        fetch(`${apiBaseUrl()}/tasks`, configuracoesRequisicao)
        .then(chamada => {
            if(chamada.status == 201 || chamada.status == 200){
                return chamada.json();
            }
            throw response;
        }).then(dados => {
            console.log(dados);
            adicionarNovaTarefaDom(dados);
        });
        //Adicionar na DOM
        descricaoTarefa.value = "";
    } else {
        alert('Escreva a descrição da tarefa');
    }
});

function adicionarNovaTarefaDom(tarefa) {
    console.log(tarefa.description);
}