const themeToggle = document.getElementById('theme-toggle');
const btnRegistrar = document.getElementById('btn-registrar');
const btnLimpar = document.getElementById('btn-limpar');
const descInput = document.getElementById('desc-input');
const catInput = document.getElementById('cat-input');
const valInput = document.getElementById('val-input');
const suggestionsDatalist = document.getElementById('sugestoes');

let transacoes = JSON.parse(localStorage.getItem('fin_transacoes')) || [];
let sugestoesLista = JSON.parse(localStorage.getItem('fin_sugestoes')) || [];

const catColors = {
    'COMIDA': '#e74c3c', 'TRANSPORTE': '#5d6d7e', 'SAUDE': '#2ecc71',
    'BELEZA': '#c37d8e', 'MENSALIDADES': '#3498db', 'FATURA': '#f1c40f', 'OUTROS': '#95a5a6'
};

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.innerText = document.body.classList.contains('light-mode') ? 'MODO ESCURO' : 'MODO CLARO';
});

btnRegistrar.addEventListener('click', () => {
    const desc = descInput.value.trim();
    const cat = catInput.value;
    const val = parseFloat(valInput.value);

    if (!desc || isNaN(val)) return alert("Preencha corretamente!");

    transacoes.push({ desc, cat, val, id: Date.now() });
    if (!sugestoesLista.includes(desc)) sugestoesLista.push(desc);

    localStorage.setItem('fin_transacoes', JSON.stringify(transacoes));
    localStorage.setItem('fin_sugestoes', JSON.stringify(sugestoesLista));
    
    descInput.value = '';
    valInput.value = '';
    render();
});

btnLimpar.addEventListener('click', () => {
    if (confirm("Apagar histórico e sugestões?")) {
        transacoes = [];
        sugestoesLista = [];
        localStorage.clear();
        render();
    }
});

function render() {
    suggestionsDatalist.innerHTML = sugestoesLista.map(s => `<option value="${s}">`).join('');
    const containerHistorico = document.getElementById('lista-historico');
    const containerStats = document.getElementById('categoria-stats');
    containerHistorico.innerHTML = '';
    containerStats.innerHTML = '';
    
    let total = 0;
    let totaisPorCat = {};

    [...transacoes].reverse().forEach(t => {
        total += t.val;
        totaisPorCat[t.cat] = (totaisPorCat[t.cat] || 0) + t.val;
        containerHistorico.innerHTML += `
            <div class="item-historico">
                <span class="badge cat-${t.cat}">${t.cat}</span>
                <span class="item-desc">${t.desc}</span>
                <span class="item-val">R$ ${t.val.toFixed(2)}</span>
            </div>`;
    });

    for (const [cat, valor] of Object.entries(totaisPorCat)) {
        containerStats.innerHTML += `
            <div class="stat-row">
                <span>${cat}</span>
                <span style="color: ${catColors[cat]}; font-weight: bold;">R$ ${valor.toFixed(2)}</span>
            </div>`;
    }

    document.getElementById('total-display').innerText = total.toFixed(2);
    renderGrafico(totaisPorCat, total);
}

function renderGrafico(totais, total) {
    const chart = document.getElementById('pie-chart');
    chart.innerHTML = '';
    if (total === 0) {
        chart.style.background = '#333';
        return;
    }

    let acumuladoPercent = 0;
    let gradiente = [];
    const radius = window.innerWidth < 900 ? 75 : 85; // Ajusta posição do texto no mobile

    for (const [cat, valor] of Object.entries(totais)) {
        const perc = (valor / total) * 100;
        const fim = acumuladoPercent + perc;
        gradiente.push(`${catColors[cat]} ${acumuladoPercent}% ${fim}%`);
        
        if (perc > 4) {
            const span = document.createElement('span');
            span.className = 'percentage-label';
            span.innerText = `${Math.round(perc)}%`;
            const meioAngulo = (acumuladoPercent + (perc / 2)) * 3.6;
            span.style.transform = `rotate(${meioAngulo}deg) translate(0, -${radius}px) rotate(-${meioAngulo}deg) translate(-50%, -50%)`;
            chart.appendChild(span);
        }
        acumuladoPercent = fim;
    }
    chart.style.background = `conic-gradient(${gradiente.join(', ')})`;
}

window.addEventListener('resize', render);
render();