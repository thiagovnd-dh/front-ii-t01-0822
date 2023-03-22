const campoTexto = document.querySelector('#nome');
const formulario = document.querySelector('form');
const envia = document.querySelector('#enviaNome');
const apaga = document.querySelector('#apagaNome');
let nomeVariavel = sessionStorage.getItem('nomeChaveSe');
let h1 = document.querySelector('#title');

nomeVariavel ? h1.textContent = `Olá fã de ${nomeVariavel}` : h1.textContent = 'Você não gosta de pokemon?';

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
});

envia.addEventListener('click', () => {
    sessionStorage.setItem('nomeChaveSe', campoTexto.value);
    h1.textContent = `Olá fã de ${sessionStorage.getItem('nomeChaveSe')}`;
});

apaga.addEventListener('click', () => {
    sessionStorage.removeItem('nomeChaveSe');
    h1.textContent = `Você não gosta de pokemon?`;
    campoTexto.value = '';
});