//Captura as entradas de dados e ações do usuário na página de login
let campoEmailLogin = document.getElementById("inputEmail");
let campoSenhaLogin = document.getElementById("inputPassword");
let botaoAcessarLogin = document.getElementById("botaoAcessar");
let formularioLogin = document.getElementById("formularioLogin");
 
// Variáveis que serão normalizadas
let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;

//Desabilita o botão de acessar ao iniciar a página
botaoAcessarLogin.setAttribute("disabled", true);
botaoAcessarLogin.innerText = "Bloqueado";

let emailValidacoesOk = false;
let senhaValidacoesOk = false;
let loginApiValidacao = true;

/// Objeto JS que representa o login do usuário na API
const loginUsuario = {
  email: "",
  password: "",
};

botaoAcessarLogin.addEventListener("click", function (evento) {

  //Verifica se ambos os campos estão preenchidos, normalizados e validados
  if (validaTelaDeLogin()) {

    evento.preventDefault();

    //NORMALIZANDO...

    //Retirando os espaços das informações obtidass
    campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(
      campoEmailLogin.value
    );
    campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(
      campoSenhaLogin.value
    );

    //Converte para minusculo os valores recebidos
    campoEmailLoginNormalizado = converteValorRecebidoParaMinusculo(
      campoEmailLoginNormalizado
    );


    //Atribui as informações normalizadas e validadas no objeto JS do usuário
    loginUsuario.email = campoEmailLoginNormalizado;
    loginUsuario.password = campoSenhaLoginNormalizado;

    /// Converter o objeto JS para objeto JSON (formato aceito pela API no corpo da requisição)
    let loginUsuarioEmJson = JSON.stringify(loginUsuario);

    let configuracoesRequisicao = {
      method: 'POST',
      body: loginUsuarioEmJson,
      headers: {
        'Content-type': 'application/json',
      },
    }

    /// Utilizando Promisses
    //Chamando a API
    exibeLoader()
    fetch(`${apiBaseUrl()}/users/login`, configuracoesRequisicao)
      .then((response) => {
        /* Verifica status de sucesso na execução da promisse */
        console.log(response);
        if (response.status == 201 || response.status == 200) {
          return response.json()
        }
        // Se o código for diferente de sucesso (201), lança um throw para que a execução caia no Catch() 
        throw response;
      }).then(function (resposta) {
        console.log(resposta);
        // Chama função ao obter sucesso no login
        loginSucesso(resposta.jwt)
        ocultaLoader();
      })
      .catch(error => {
        // Chama função ao obter algum erro no login
        loginErro(error.status);
        ocultaLoader();
      });

    //  Ao obter o sucesso, recebe o json (token JWT) do usuário
    function loginSucesso(jwtRecebido) {

      console.log("Jwt recebido\n");
      console.log(jwtRecebido);

      ///Também é possivel setar utilizando o token usando Cookies
      //document.cookie = `jwt=${jwtRecebido}`;

      ///  Setando o Storage no navegador.
      sessionStorage.setItem("jwt", jwtRecebido);

      /// Direciona o usuário para a tela de tarefas após sucesso ao logar
      window.location.href = "tarefas.html";
    }

    function loginErro(statusRecebido) {

      let loginValidacao = document.getElementById("loginValidacao");
      elementoSmallErro(loginValidacao);

      //Limpa o campo da senha ao errar o login
      campoSenhaLogin.value = "";

      if (statusRecebido == 400 || statusRecebido == 404) {
        console.log("Ocorreu algum erro, verifique o e-mail e/ou senha");
        loginValidacao.innerHTML = "Ocorreu algum erro, verifique o e-mail e/ou senha";
        loginApiValidacao = false;

      } else {
        loginApiValidacao = true;
      }
      validaTelaDeLogin();
    }

  } else {
    evento.preventDefault();
    alert("Ambos campos devem ser preenchidos");
  }
});

function resetaValidacaoLoginErro() {
  loginValidacao.innerHTML = "";
  botaoAcessarLogin.removeAttribute("disabled");
  botaoAcessarLogin.innerText = "Acessar";
  loginApiValidacao = true;
}

campoEmailLogin.addEventListener("keyup", function () {
  let inputEmailValidacao = document.getElementById("inputEmailValidacao");
  campoEmailLogin.style.border = `1px solid #E42323BF`;

  elementoSmallErro(inputEmailValidacao);

  let emailEValido = validaEmailRecebido(campoEmailLogin.value);

  //Se o e-mail não for válido e o campo não for vazio, depois essa mais complexa
  if (!emailEValido && campoEmailLogin.value != "") {
    inputEmailValidacao.innerText = "E-mail inválido";
    emailValidacoesOk = false;

    //Se o email não for válido e o campo for vazio
  } else if (!emailEValido && campoEmailLogin.value == "") {
    inputEmailValidacao.innerText = "Campo obrigatorio";
    emailValidacoesOk = false;

    //Senão.. ambos são válidos
  } else {
    inputEmailValidacao.innerText = "";
    campoEmailLogin.style.border = ``;
    emailValidacoesOk = true;
  }

  validaTelaDeLogin();
});

campoSenhaLogin.addEventListener("keyup", function () {
  let inputPasswordValidacao = document.getElementById(
    "inputPasswordValidacao"
  );
  campoSenhaLogin.style.border = `1px solid #E42323BF`;
  elementoSmallErro(inputPasswordValidacao);

  if (campoSenhaLogin.value == "") {
    inputPasswordValidacao.innerText = "Campo obrigatorio";
    senhaValidacoesOk = false;
  } else {
    inputPasswordValidacao.innerText = "";
    campoSenhaLogin.style.border = ``;
    senhaValidacoesOk = true;
  }
  resetaValidacaoLoginErro();
  validaTelaDeLogin();
});

function validaTelaDeLogin() {
  //Se ambos algum dos campos não forem válido
  if (!emailValidacoesOk || !senhaValidacoesOk || !loginApiValidacao) {
    botaoAcessarLogin.setAttribute("disabled", true);
    botaoAcessarLogin.innerText = "Bloqueado";
    return false;
    //Se ambos forem válidos
  } else {
    botaoAcessarLogin.removeAttribute("disabled");
    botaoAcessarLogin.innerText = "Acessar";
    return true;
  }
}