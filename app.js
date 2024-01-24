let numeroSecreto;
let tentativas = 1;
let listaDeNumeroSorteados = [];
let numeroLimite = 10;

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.textContent = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    numeroSecreto = gerarNumeroAleatorio(); // Chame a função para gerar o número secreto no início do jogo
    exibirTextonaTela('#tituloJogo', 'Jogo do número secreto');
    exibirTextonaTela('#instrucoesJogo', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (parseInt(chute) === numeroSecreto) {
        exibirTextonaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextonaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (parseInt(chute) > numeroSecreto) {
            exibirTextonaTela('p', 'O número secreto é menor');
        } else {
            exibirTextonaTela('p', 'O número secreto é maior');
        }
        tentativas++;
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido;

    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumeroSorteados.includes(numeroEscolhido));

    listaDeNumeroSorteados.push(numeroEscolhido);

    if (listaDeNumeroSorteados.length === 3) {
        listaDeNumeroSorteados = [];
    }

    return numeroEscolhido;
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}