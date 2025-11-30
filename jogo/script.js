// --- SISTEMA GERAL ---
let intervaloGeral;

// Função auxiliar para pegar elementos
function el(id) { 
    return document.getElementById(id); 
}

// Navegação entre telas
function irPara(idTela) {
    document.querySelectorAll('.tela-jogo').forEach(tela => {
        tela.style.display = 'none';
        tela.classList.remove('flex'); 
    });
    
    const tela = el(idTela);
    if(tela) {
        tela.style.display = 'flex';
        // Garante a direção correta do flex para telas específicas
        if(idTela.startsWith('jogo') || idTela === 'telaCelebracao' || idTela === 'telaInicial') {
            tela.style.flexDirection = 'column';
        }
    }
}

function voltarMenu() {
    clearInterval(intervaloGeral);
    irPara('telaMenu');
}

// Função de Vitória
function vitoria() {
    clearInterval(intervaloGeral);
    // Removemos pontosGerais (não estava em uso)
    // Removemos a lógica de 'lupinhaVitoria' pois o ID não existe no HTML atual
    irPara('telaCelebracao');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => irPara('telaInicial'));

const btnIniciar = el('btnIniciar');
if(btnIniciar) btnIniciar.addEventListener('click', () => irPara('telaMenu'));

const btnContinuar = el('btnContinuar');
if(btnContinuar) btnContinuar.addEventListener('click', () => voltarMenu());

const btnAjuda = el('btnAjuda');
if(btnAjuda) btnAjuda.addEventListener('click', () => irPara('telaAjuda'));

// Roteador de Jogos
function iniciarJogo(id) {
    irPara(id);
    if(id === 'jogoDentes') setupDentes();
    if(id === 'jogoBrinquedos') setupBrinquedos();
    if(id === 'jogoCama') setupCama();
    if(id === 'jogoBanho') setupBanho();
    if(id === 'jogoRoupas') setupRoupas();
    if(id === 'jogoMaos') setupMaos();
}

// ======================================================
// 1. JOGO DOS DENTES
// ======================================================
function setupDentes() {
    const grade = el('gradeDentes'); 
    grade.innerHTML = '';
    let dentesLimpos = 0; 
    let tempo = 30;
    el('timerDenteDisplay').innerText = "Tempo: 30s";
    el('progressoBoca').style.width = '0%';

    const areaBoca = el('areaBoca');
    const cursorEscova = el('cursorEscova');
    
    cursorEscova.style.display = 'flex';

    areaBoca.onmousemove = function(e) {
        const rect = areaBoca.getBoundingClientRect();
        const x = e.clientX - rect.left - 48;
        const y = e.clientY - rect.top - 48;
        cursorEscova.style.left = x + 'px';
        cursorEscova.style.top = y + 'px';
    };

    for(let i=0; i<6; i++) {
        let div = document.createElement('div');
        div.className = 'h-24 bg-yellow-100 rounded-xl border-4 border-yellow-200 flex items-center justify-center text-4xl cursor-pointer relative shadow-sm transition-colors duration-300 select-none z-20';
        div.innerHTML = '<span>🦷</span>'; 
        div.dataset.status = 'sujo';
        
        // Clique: Mata Germe
        div.onclick = function() {
            if(div.dataset.germe === 'sim') {
                div.dataset.germe = 'nao';
                let germeEl = div.querySelector('.germe');
                if(germeEl) {
                    germeEl.innerText = '💥'; 
                    setTimeout(() => germeEl.remove(), 200);
                }
            }
        };

        // Passar Mouse: Limpa Dente
        div.onmouseenter = function() {
            if(div.dataset.germe !== 'sim' && div.dataset.status === 'sujo') {
                div.className = 'h-24 bg-white rounded-xl border-4 border-gray-200 flex items-center justify-center text-4xl cursor-pointer relative shadow-sm transition-colors duration-300 z-20';
                div.dataset.status = 'limpo'; 
                
                const brilho = document.createElement('div');
                brilho.innerText = '✨';
                brilho.className = 'absolute text-2xl animate-ping pointer-events-none';
                div.appendChild(brilho);

                dentesLimpos++;
                atualizarBarraDentes(dentesLimpos);
            }
        };
        grade.appendChild(div);
    }

    intervaloGeral = setInterval(() => {
        tempo--; 
        el('timerDenteDisplay').innerText = "Tempo: " + tempo + "s";
        if(Math.random() > 0.7) {
            let idx = Math.floor(Math.random() * 6);
            let denteAlvo = grade.children[idx];
            if(denteAlvo.dataset.germe !== 'sim') {
                denteAlvo.dataset.germe = 'sim';
                let g = document.createElement('div');
                g.className = 'germe absolute inset-0 flex items-center justify-center text-3xl animate-bounce pointer-events-none';
                g.innerText = '🦠'; 
                denteAlvo.appendChild(g);
            }
        }
        if(tempo <= 0) { alert("O tempo acabou!"); voltarMenu(); }
    }, 1000);
}

function atualizarBarraDentes(qtd) {
    let pct = (qtd / 6) * 100;
    el('progressoBoca').style.width = pct + '%';
    if(qtd >= 6) setTimeout(() => vitoria(), 500);
}

// ======================================================
// 2. JOGO DOS BRINQUEDOS
// ======================================================
function setupBrinquedos() {
    const sala = el('salaBrinquedos');
    
    Array.from(sala.children).forEach(c => { 
        if(c.tagName === 'DIV' && !c.innerText.includes('CAIXA') && c.id !== 'lupinhaGame') c.remove(); 
    });
    
    const lupaGame = el('lupinhaGame');
    if(lupaGame) {
        lupaGame.classList.add('hidden');
        lupaGame.classList.remove('flex');
    }

    let barra = el('barraVilao'); 
    barra.style.width = '0%';
    let vilaoPct = 0; 
    let brinquedosRestantes = 6;

    const posicoes = [
        {t:'10%', l:'5%'}, {t:'30%', l:'15%'}, {t:'60%', l:'30%'},
        {t:'45%', l:'50%'}, {t:'60%', l:'70%'}, {t:'30%', l:'80%'} 
    ];

    const icones = ['🤖', '🚗', '🧸', '⚽', '🦖', '🎸'];
    
    icones.forEach((icon, i) => {
        let b = document.createElement('div'); 
        b.innerText = icon;
        b.className = 'absolute text-5xl cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out z-20';
        
        if(i < posicoes.length) { 
            b.style.top = posicoes[i].t; 
            b.style.left = posicoes[i].l; 
        } else { 
            b.style.top = '50%'; 
            b.style.left = '50%'; 
        }

        b.onclick = function() {
            b.onclick = null; 
            b.style.cursor = 'default';
            b.style.top = '80%'; 
            b.style.left = '85%';
            b.style.transform = 'scale(0.1) rotate(360deg)';
            b.style.opacity = '0';
            
            setTimeout(() => {
                if(b.parentNode) b.remove();
                brinquedosRestantes--;
                
                if(brinquedosRestantes <= 0) {
                    clearInterval(intervaloGeral);
                    if(lupaGame) {
                        lupaGame.classList.remove('hidden');
                        lupaGame.classList.add('flex');
                    }
                    setTimeout(() => vitoria(), 3000);
                }
            }, 600);
        };
        sala.appendChild(b);
    });

    intervaloGeral = setInterval(() => {
        vilaoPct += 1.5; 
        barra.style.width = vilaoPct + '%';
        if(vilaoPct >= 100) { alert("Oh não! A bagunça venceu."); voltarMenu(); }
    }, 300);
}

// ======================================================
// 3. JOGO DA CAMA
// ======================================================
let estadoCama = { t1: false, t2: false, lencol: false };

function setupCama() {
    estadoCama = { t1: false, t2: false, lencol: false };
    
    el('travesseiro1').classList.add('-rotate-12');
    el('travesseiro2').classList.add('translate-y-4', 'rotate-6');
    el('lencolBaguncado').style.opacity = '1'; 
    el('lencolArrumado').style.opacity = '0';
    
    ['checkT1','checkT2','checkLen'].forEach((id,i) => {
        let nome = ["Travesseiro 1","Travesseiro 2","Lençol"][i];
        let elem = el(id);
        elem.innerHTML = `<span>🔲</span> ${nome}`;
        elem.classList.remove('text-green-600', 'border-green-200', 'bg-green-50');
        elem.classList.add('text-gray-400', 'border-gray-100', 'bg-white');
    });
}

function arrumarCama(parte) {
    if(parte === 't1') { 
        el('travesseiro1').classList.remove('-rotate-12'); 
        marcarCheck('checkT1', 'Travesseiro 1');
        estadoCama.t1 = true; 
    }
    if(parte === 't2') { 
        el('travesseiro2').classList.remove('translate-y-4', 'rotate-6'); 
        marcarCheck('checkT2', 'Travesseiro 2');
        estadoCama.t2 = true; 
    }
    if(parte === 'lencol') { 
        el('lencolBaguncado').style.opacity = '0'; 
        el('lencolArrumado').style.opacity = '1'; 
        marcarCheck('checkLen', 'Lençol');
        estadoCama.lencol = true; 
    }
    
    if(estadoCama.t1 && estadoCama.t2 && estadoCama.lencol) {
        setTimeout(() => vitoria(), 800);
    }
}

function marcarCheck(id, texto) {
    const elem = el(id);
    elem.innerHTML = `<span>✅</span> ${texto}`;
    elem.classList.remove('text-gray-400', 'border-gray-100', 'bg-white');
    elem.classList.add('text-green-600', 'border-green-200', 'bg-green-50');
}

// ======================================================
// 4. JOGO DO BANHO
// ======================================================
function setupBanho() {
    const container = el('camadaSujeira'); 
    container.innerHTML = '';
    el('barraLimpeza').style.width = '0%'; 
    el('txtLimpeza').innerText = '0%';
    
    let totalSujeira = 20; 
    let removida = 0;
    let sujeiras = [];

    for(let i=0; i<totalSujeira; i++) {
        let s = document.createElement('div');
        s.className = 'absolute w-12 h-12 bg-amber-800 rounded-full opacity-80 transition-transform duration-100';
        s.style.top = (Math.random() * 80 + 10) + '%'; 
        s.style.left = (Math.random() * 70 + 15) + '%';
        s.dataset.active = 'true';
        container.appendChild(s);
        sujeiras.push(s);
    }

    const cursor = el('cursorEsponja'); 
    cursor.style.display = 'flex';
    const areaBanho = el('areaBanho');
    
    function checkCollision(x, y) {
        sujeiras.forEach(s => {
            if (s.dataset.active === 'true') {
                const rect = s.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(x - centerX, y - centerY);
                
                if (dist < 50) { 
                    s.dataset.active = 'false';
                    s.className = 'absolute w-12 h-12 bg-blue-200 rounded-full opacity-50 text-2xl flex items-center justify-center pop-effect';
                    s.innerText = '🫧';
                    
                    removida++;
                    let pct = Math.floor((removida / totalSujeira) * 100);
                    el('barraLimpeza').style.width = pct + '%';
                    el('txtLimpeza').innerText = pct + '%';
                    
                    if(removida >= totalSujeira) setTimeout(() => vitoria(), 500); 
                }
            }
        });
    }

    const moveHandler = (clientX, clientY) => {
        const rect = areaBanho.getBoundingClientRect();
        cursor.style.left = (clientX - rect.left) + 'px';
        cursor.style.top = (clientY - rect.top) + 'px';
        checkCollision(clientX, clientY);
    }

    areaBanho.onmousemove = (e) => moveHandler(e.clientX, e.clientY);
    areaBanho.ontouchmove = (e) => { 
        e.preventDefault(); 
        moveHandler(e.touches[0].clientX, e.touches[0].clientY); 
    };
}

// ======================================================
// 5. JOGO DAS ROUPAS
// ======================================================
let roupasAcertos = 0; 
let roupaAtualTipo = 'suja';

function setupRoupas() {
    roupasAcertos = 0;
    for(let i=1; i<=5; i++) {
        el('pontoR'+i).className = "w-5 h-5 rounded-full bg-gray-300 transition-colors duration-300 border-2 border-gray-400";
    }
    novaRodadaRoupa();
}

function novaRodadaRoupa() {
    const tipos = [
        {icone:'🧦', status:'suja'},
        {icone:'👕', status:'limpa'},
        {icone:'👖', status:'suja'},
        {icone:'👗', status:'limpa'},
        {icone:'🧥', status:'suja'},
        {icone:'👙', status:'limpa'}
    ];
    
    let r = tipos[Math.floor(Math.random()*tipos.length)];
    r.status = Math.random() < 0.5 ? 'suja' : 'limpa';
    roupaAtualTipo = r.status;
    
    const itemEl = el('itemRoupa'); 
    const overlay = el('overlayRoupa');
    
    itemEl.style.transform = 'scale(0)'; 
    
    setTimeout(() => {
        itemEl.innerText = r.icone;
        if(r.status === 'suja') {
            itemEl.className = "text-9xl transition-all duration-300 item-sujo";
            overlay.innerText = '🤢';
        } else {
            itemEl.className = "text-9xl transition-all duration-300 item-limpo";
            overlay.innerText = '✨';
        }
        itemEl.style.transform = 'scale(1)';
    }, 100);
}

function decisaoRoupa(escolha) {
    if(escolha === roupaAtualTipo) {
        roupasAcertos++; 
        el('pontoR'+roupasAcertos).className = "w-5 h-5 rounded-full bg-green-500 shadow-lg border-2 border-white transform scale-125";
        el('itemRoupa').classList.add('animate-spin');
        
        if(roupasAcertos >= 5) {
            setTimeout(() => vitoria(), 800); 
        } else { 
            setTimeout(() => { 
                el('itemRoupa').classList.remove('animate-spin'); 
                novaRodadaRoupa(); 
            }, 500);
        }
    } else {
        el('itemRoupa').classList.add('shake'); 
        setTimeout(() => { el('itemRoupa').classList.remove('shake'); }, 600);
    }
}

// ======================================================
// 6. JOGO DAS MÃOS
// ======================================================
let faseMao = 0; 
let progressoEsfregar = 0;

function updateTrilha(passo) {
    for(let i=1; i<=5; i++) {
        const s = el('step'+i);
        if(s) {
            s.className = "";
            if(i === passo) {
                s.className = "w-14 h-14 rounded-full bg-blue-400 text-white flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-blue-200 transition-all scale-110";
            } else if(i < passo) {
                s.className = "w-12 h-12 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-xl font-bold shadow-md transition-all";
            } else {
                s.className = "w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xl opacity-50 transition-all";
            }
        }
    }
}

function setupMaos() {
    faseMao = 0; 
    progressoEsfregar = 0; 
    updateTrilha(1);
    
    if(el('aguaCaindo')) el('aguaCaindo').style.height = '0px'; 
    
    const bolhas = el('bolhasContainer');
    if(bolhas) bolhas.style.opacity = '0';
    
    if(el('barraEsfregarContainer')) el('barraEsfregarContainer').style.display = 'none'; 
    if(el('areaToalha')) el('areaToalha').style.display = 'none';
    if(el('progressoEsfregar')) el('progressoEsfregar').style.width = '0%';
    
    const ator = el('atorMaos');
    const icone = el('iconeMao');
    
    if(ator) {
        if(icone) icone.innerText = '✋'; 
        ator.classList.add('pointer-events-none');
        ator.classList.remove('cursor-pointer');
    }
    
    atualizarInstrucaoMao("1. Toque na torneira para abrir");
}

function atualizarInstrucaoMao(txt) {
    const elTexto = el('instrucaoMaos'); 
    if(!elTexto) return;
    elTexto.innerText = txt;
    elTexto.classList.remove('pop-in');
    void elTexto.offsetWidth; 
    elTexto.classList.add('pop-in');
}

function interagirMao(alvo) {
    const elTexto = el('instrucaoMaos');

    // 1. ÁGUA (Torneira)
    if(alvo === 'torneira') {
        if(faseMao === 0) { 
            el('aguaCaindo').style.height = '120px'; 
            faseMao = 1; 
            updateTrilha(2); 
            atualizarInstrucaoMao("2. Pegue o sabonete (rosa)"); 
        } 
        else if (faseMao === 3 && progressoEsfregar >= 100) { 
            el('aguaCaindo').style.height = '120px'; 
            el('bolhasContainer').style.opacity = '0'; 
            faseMao = 4; 
            updateTrilha(5); 
            atualizarInstrucaoMao("5. Feche a torneira"); 
        } 
        else if (faseMao === 4) { 
            el('aguaCaindo').style.height = '0px'; 
            el('areaToalha').style.display = 'block'; 
            faseMao = 5; 
            atualizarInstrucaoMao("6. Use a toalha"); 
        }
    }
    
    // 2. SABÃO
    if(alvo === 'sabao') {
        if(faseMao === 1) { 
            faseMao = 2; 
            
            el('aguaCaindo').style.height = '0px'; 
            el('bolhasContainer').style.opacity = '0.5'; 
            el('barraEsfregarContainer').style.display = 'block'; 
            
            const ator = el('atorMaos');
            ator.classList.remove('pointer-events-none'); 
            ator.classList.add('cursor-pointer');

            updateTrilha(3); 
            atualizarInstrucaoMao("3. Clique nas mãos várias vezes!"); 
        } 
        else if (faseMao === 0) {
            elTexto.classList.add('shake');
            elTexto.innerText = "Ligue a água primeiro!";
            setTimeout(() => { 
                elTexto.classList.remove('shake'); 
                if(faseMao === 0) elTexto.innerText = "1. Toque na torneira para abrir";
            }, 1000);
        }
    }
    
    // 3. ESFREGAR
    if(alvo === 'maos') {
        if(faseMao === 2 || faseMao === 3) {
            
            if(progressoEsfregar >= 100) return;

            faseMao = 3; 
            progressoEsfregar += 15; 
            if(progressoEsfregar > 100) progressoEsfregar = 100;

            el('progressoEsfregar').style.width = progressoEsfregar + '%';
            
            const ator = el('atorMaos');
            ator.classList.add('shake'); 
            setTimeout(()=> ator.classList.remove('shake'), 100);
            
            if(progressoEsfregar >= 100) { 
                el('bolhasContainer').style.opacity = '1'; 
                el('barraEsfregarContainer').style.display = 'none'; 
                
                ator.classList.add('pointer-events-none');
                ator.classList.remove('cursor-pointer');

                updateTrilha(4); 
                atualizarInstrucaoMao("4. Abra a torneira para enxaguar"); 
            }
        }
    }
    
    // 4. TOALHA
    if(alvo === 'toalha' && faseMao === 5) { 
        if(el('iconeMao')) el('iconeMao').innerText = '✨'; 
        
        el('areaToalha').style.display = 'none'; 
        updateTrilha(6); 
        atualizarInstrucaoMao("MÃOS LIMPAS!"); 
        setTimeout(() => vitoria(), 1000); 
    }
}