// 1 - Quando eu clicar no botão de enviar eu quero mudar o fundo do body para verde

let botaoEnviar = document.getElementById('enviar');

botaoEnviar.addEventListener('click', ()=> {
    document.body.style.backgroundColor = "green";
});

//2 - Quando o cursor do mouse passar em cima do parágrafo ele deve ficar em caixa alta
// O texto tem que voltar para caixa baixa quando o curso sair
let paragrafo = document.getElementsByTagName('p')[0];

paragrafo.addEventListener('mouseover', ()=>{
    paragrafo.textContent = paragrafo.textContent.toUpperCase();
});

paragrafo.addEventListener('mouseout', ()=>{
    paragrafo.textContent = paragrafo.textContent.toLocaleLowerCase();
});

// 3 - Acender a bolinha de número respectivo no teclado
// Estilizar da maneira que quiser
let bolinhas = document.querySelectorAll(".rating-single");

for(let i=0; i< bolinhas.length; i++) {
    bolinhas[i].addEventListener('click', ()=>{
        console.log(`Clicou na bolinha ${i+1}`);
    })
}

document.addEventListener('keydown', (event)=>{
    switch(event.key){
        case '1':
            removerSelecionado();
            bolinhas[0].classList.add("selecionado");
            break;
        case '2':
            removerSelecionado();
            bolinhas[1].classList.add("selecionado");
            break;
        case '3':
            removerSelecionado();
            bolinhas[2].classList.add("selecionado");
            break;
        case '4':
            removerSelecionado();
            bolinhas[3].classList.add("selecionado");
            break;
        case '5':
            removerSelecionado();
            bolinhas[4].classList.add("selecionado");
            break;
    }
})

function removerSelecionado() {
    for(let i=0; i<bolinhas.length; i++) {
        bolinhas[i].classList.remove("selecionado");
    }
}