// Configurações
const MINUTOS_PAUSA_CURTA = 5;
const MINUTOS_PAUSA_LONGA = 15;

let cronometro;
let tempoRestante;
let tempoTotalFase;
let tempoEstudoOriginal;
let estaPausado = true;
let modoAtual = 'foco'; // Foco ou descanso
let contagemFoco = 0;

const telaMenu = document.getElementById('tela-menu');
const telaTimer = document.getElementById('tela-timer');
const telaParabens = document.getElementById('tela-parabens');
const modal = document.getElementById('modal-aviso');
const displayTimer = document.getElementById('timer-numeros');
const displayPlanta = document.getElementById('exibicao-planta');
const textoStatus = document.getElementById('texto-status');
const etiquetaPausa = document.getElementById('etiqueta-pausa');
const botaoPausar = document.getElementById('botao-pausar');
const mensagemModal = document.getElementById('mensagem-modal');

function iniciarPomodoro(minutos) {
    tempoEstudoOriginal = minutos;
    contagemFoco = 0;
    prepararFaseFoco();
    trocarTela(telaTimer);
}

function prepararFaseFoco() {
    modoAtual = 'foco';
    tempoTotalFase = tempoEstudoOriginal * 60;
    tempoRestante = tempoTotalFase;
    
    textoStatus.innerText = "FOCO";
    etiquetaPausa.classList.add('escondido');
    estaPausado = false;
    
    atualizarDisplay();
    atualizarPlanta();
    iniciarContagem();
}

function iniciarContagem() {
    clearInterval(cronometro);
    botaoPausar.innerText = "Pausar";
    
    cronometro = setInterval(() => {
        if (!estaPausado) {
            tempoRestante--;
            atualizarDisplay();
            
            if (modoAtual === 'foco') {
                atualizarPlanta();
            }

            if (tempoRestante <= 0) {
                clearInterval(cronometro);
                logicaDeCiclo();
            }
        }
    }, 1000);
}

function logicaDeCiclo() {
    if (modoAtual === 'foco') {
        contagemFoco++;
        
        if (contagemFoco === 1 || contagemFoco === 2) {
            iniciarDescanso(MINUTOS_PAUSA_CURTA, "Pausa Curta");
        } else if (contagemFoco === 3) {
            iniciarDescanso(MINUTOS_PAUSA_LONGA, "Pausa Longa");
        }
    } else {
        // Se acabou uma pausa
        if (contagemFoco < 3) {
            abrirModal("Descanso finalizado! Vamos voltar ao foco.");
        } else {
            // Se acabou a última pausa
            trocarTela(telaParabens);
        }
    }
}

function iniciarDescanso(minutos, nome) {
    modoAtual = 'descanso';
    tempoTotalFase = minutos * 60;
    tempoRestante = tempoTotalFase;
    
    textoStatus.innerText = "DESCANSO";
    etiquetaPausa.innerText = nome;
    etiquetaPausa.classList.remove('escondido');
    displayPlanta.innerText = "☕";
    
    atualizarDisplay();
    iniciarContagem();
}

function atualizarPlanta() {
    const porcentagemFaltante = (tempoRestante / tempoTotalFase) * 100;

    if (porcentagemFaltante <= 20) {
        displayPlanta.innerText = "🌳";
    } else if (porcentagemFaltante <= 35) {
        displayPlanta.innerText = "🌾";
    } else if (porcentagemFaltante <= 65) {
        displayPlanta.innerText = "🌿";
    } else if (porcentagemFaltante <= 90) {
        displayPlanta.innerText = "🌱";
    } else {
        displayPlanta.innerText = "🌰";
    }
}

function atualizarDisplay() {
    const m = Math.floor(tempoRestante / 60);
    const s = tempoRestante % 60;
    displayTimer.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function alternarPausa() {
    estaPausado = !estaPausado;
    botaoPausar.innerText = estaPausado ? "Retomar" : "Pausar";
}

function trocarTela(alvo) {
    [telaMenu, telaTimer, telaParabens].forEach(t => t.classList.add('escondido'));
    alvo.classList.remove('escondido');
}

function abrirModal(msg) {
    mensagemModal.innerText = msg;
    modal.classList.remove('escondido');
    estaPausado = true;
}

function fecharModal() {
    modal.classList.add('escondido');
    prepararFaseFoco();
}

function voltarAoMenu() {
    clearInterval(cronometro);
    estaPausado = true;
    trocarTela(telaMenu);
}