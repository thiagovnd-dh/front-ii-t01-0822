const nomeUsuario = document.getElementById('nome');
const senhaUsuario = document.getElementById('senha');
const form = document.getElementById('form');
const elementoErro = document.getElementById('mensagem');


form.addEventListener('submit',(e) => {
    let mensagens = [];
    //Captura de erros
    if (nomeUsuario.value === '' || nomeUsuario == 'null') {
        mensagens.push('Nome é obrigatório');
    }
    //mínimo de 6 caracteres na senha 
    if (senhaUsuario.value.length < 6) {
        mensagens.push('Senha muito curta');
    }

    //Se o usuário usar senha 123456
    if(senhaUsuario.value == "123456") {
        mensagens.push('Essa senha é muito fraca');
    }

    //exibir esse erro na tela
    if(mensagens.length > 0) {
        e.preventDefault();
        elementoErro.innerHTML = mensagens.join(', ');
    }
})