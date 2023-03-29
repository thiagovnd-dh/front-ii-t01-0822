let loginUsuario = {
    email: "thiagovnd@gmail.com",
    password: "123456789"
}

const loginUsuarioJson = JSON.stringify(loginUsuario);

let configuracoesRequisicao = {
    method: 'POST',
    body: loginUsuarioJson,
    headers: {
        'Content-type': 'application/json',
    },
}

// fetch("https://todo-api.ctd.academy/v1/users/login", configuracoesRequisicao) //1
//   .then((response) => response.json()) //2
//   .then((user) => {
//     console.log(user.jwt); //3
//   });

async function fazerLogin() {
    try{
        const resposta = await fetch(`https://todo-api.ctd.academy/v1/users/login`, configuracoesRequisicao);
        let chaveJwt = await resposta.json();
        console.log(chaveJwt.jwt);\
    }
    catch(erro) {
        console.log(erro);
    }
}

fazerLogin();