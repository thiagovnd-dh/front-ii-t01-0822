// Jogar a moeda e sortear uma de duas opções
function flipCoin() {
    return Math.floor(Math.random() * 2);
}

// Converter resultado em string
function getCoinFace (coinFlip) {
    return coinFlip === 0 ? "Cara" : "Coroa"; //Operador Ternário
}

function playGame() {
    // Perguntar quantas vezes quer jogar
    const numRounds = parseInt(prompt("Quantas rodadas você quer jogar?"))
    let score = 0;
    // Perguntar jogadas (Cara ou Coroa)
    for(let i = 0; i < numRounds; i++) {
        // Girar a Moeda
        const coinFlip = flipCoin();
        const coinFace = getCoinFace(coinFlip);

        const guess = prompt("Você aposta em Cara ou Coroa?");

        // Verificar se a aposta é igual ao resutado
        if(guess.toLowerCase() === coinFace.toLowerCase()) {
            //Tá certo
            console.log(`Você apostou em ${guess} e a moeda deu ${coinFace}. Você marcou ponto`);
            score++;
        }
        else {
            // Tá errado
            console.log(`Você apostou em ${guess} e a moeda deu ${coinFace}. Você errou`);
        }
    }

    // Trazer resultados 
    console.log(`Fim de Jogo! Sua pontuação é ${score} de ${numRounds} rodadas jogadas`)
}

//Chamar a função para jogar o jogo
playGame();