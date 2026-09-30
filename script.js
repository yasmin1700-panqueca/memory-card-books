// Seleciona todos os cards
const cards = document.querySelectorAll('.memory-card-books');

// variáveis que controlam o estado do jogo
let primeiraCarta = null;   // guarda a 1 carta clicada
let segundaCarta = null;    // guarda a 2 carta clicada
let podeClicar = true;      // impede novos cliques enquanto o jogo "pensa"
let paresEncontrados = 0;   // conta quantos pares já foram descobertos

const totalDePares = cards.length / 2; // total de pares que existem no tabuleiro


// Função chamada toda vez que o jogador clica em uma carta
function virarCarta() {

    // Se o tabuleiro estiver travado, não faz nada 
    if (!podeClicar) return;
    
    // Se clicar duas vezes na mesma carta, não faz nada
    if (this === primeiraCarta) return;

    // Mostra a carta na tela (classe CSS que faz o "flip")
    this.classList.add('flip');

    // Verifica se é a primeira carta
    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    // Guarda a segunda carta
    segundaCarta = this;

    verificarPar();
}


// Verifica se as cartas são iguais
function verificarPar() {

    const cartasIguais = 
        primeiraCarta.dataset.framework === 
        segundaCarta.dataset.framework;

    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}


// Mantém as cartas viradas quando o par é encontrado
function manterParEncontrado() {

    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    // Verifica se todos os pares foram encontrados
    if (paresEncontrados === totalDePares) {
        fimDeJogo();
    }
}


// Desvira as cartas quando elas não são iguais
function desvirarCartas() {

    podeClicar = false;

    setTimeout(() => {

        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetarJogada();

    }, 1500);
}


// Reseta a jogada
function resetarJogada() {

    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}


// Embaralha as cartas
function embaralharCartas() {

    cards.forEach(card => {

        const posicaoAleatoria = Math.floor(
            Math.random() * cards.length
        );

        card.style.order = posicaoAleatoria;
    });
}


// Função chamada quando o jogador encontra todos os pares
function fimDeJogo() {

    setTimeout(() => {
        alert('Parabéns! Você encontrou todos os pares.');
    }, 300);
}


// Embaralha as cartas quando o jogo começa
embaralharCartas();


// Adiciona o evento de clique em cada carta
cards.forEach(card => {
    card.addEventListener('click', virarCarta);
});
