const API_URL = "https://projeto-uepb-connect-production.up.railway.app/retornarDadosDashboard";
const API_URL_VAGAS = "https://projeto-uepb-connect-production.up.railway.app/paginas/retornarVagasDashboard";
const API_URL_BASE = "https://projeto-uepb-connect-production.up.railway.app";

let vagasSalvas = new Set();


// ===============================
// NORMALIZA TEXTO (remove acentos, minúsculo, trim)
// ===============================

function normalizarTexto(texto) {

    if (!texto) {
        return "";
    }

    return String(texto)
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}


// ===============================
// NORMALIZA TIPO DE EMPREGO
//
// O backend manda o enum (ESTAGIO, CLT, PJ, TEMPORARIO, APRENDIZ).
// "Freelance" no filtro precisa apontar pra "pj", não pra "freelance".
// ===============================

function normalizarTipo(tipo) {

    const valor = normalizarTexto(tipo);

    switch (valor) {

        case "freelance":
        case "pj":
        case "freelance / pj":
            return "pj";

        case "estagio":
            return "estagio";

        case "clt":
            return "clt";

        case "temporario":
            return "temporario";

        case "aprendiz":
            return "aprendiz";

        default:
            return valor;
    }
}


// ===============================
// MAPA DE FILTROS
//
// Tipo: rótulo do chip -> valor normalizado real do backend
// Área: rótulo do chip -> lista de áreas normalizadas que ele cobre
//       (várias áreas reais podem cair sob o mesmo chip resumido)
// ===============================

const MAPA_TIPO = {
    'Todos': null,
    'Estágio': 'estagio',
    'CLT': 'clt',
    'Freelance': 'pj'
};

const MAPA_AREA = {
    'IA / Dados': ['inteligencia artificial', 'ciencia de dados'],
    'Web': ['desenvolvimento web', 'desenvolvimento de software'],
    'Mobile': ['desenvolvimento mobile'],
    'Cloud': ['devops / cloud']
};

const GRUPO_TIPO = Object.keys(MAPA_TIPO);
const GRUPO_AREA = Object.keys(MAPA_AREA);


// ===============================
// FILTROS DE CHIPS (Tipo / Área)
// ===============================

function toggleFilter(el) {

    const texto = el.textContent.trim();

    if (GRUPO_TIPO.includes(texto)) {

        document.querySelectorAll('.filter-chip').forEach(c => {
            if (GRUPO_TIPO.includes(c.textContent.trim())) {
                c.classList.remove('on');
            }
        });

        el.classList.add('on');

    } else if (GRUPO_AREA.includes(texto)) {

        document.querySelectorAll('.filter-chip').forEach(c => {
            if (GRUPO_AREA.includes(c.textContent.trim())) {
                c.classList.remove('area-on');
            }
        });

        el.classList.add('area-on');
    }

    aplicarFiltroRecomendadas();
}


function aplicarFiltroRecomendadas() {

    const chipTipo = document.querySelector('.filter-chip.on');
    const chipArea = document.querySelector('.filter-chip.area-on');

    const tipoFiltro = chipTipo ? MAPA_TIPO[chipTipo.textContent.trim()] : null;
    const areasFiltro = chipArea ? MAPA_AREA[chipArea.textContent.trim()] : null;

    const vagas = document.querySelectorAll('#recomendadas-list .vaga');
    let visiveis = 0;

    vagas.forEach(v => {

        const tipoOk = !tipoFiltro || v.dataset.tipo === tipoFiltro;

        const areaOk = !areasFiltro || areasFiltro.includes(v.dataset.area);

        const mostrar = tipoOk && areaOk;

        v.style.display = mostrar ? '' : 'none';

        if (mostrar) {
            visiveis++;
        }
    });

    const empty = document.getElementById('recomendadas-empty');

    if (empty) {
        empty.style.display = visiveis === 0 ? 'block' : 'none';
    }
}

window.toggleFilter = toggleFilter;
window.aplicarFiltroRecomendadas = aplicarFiltroRecomendadas;


// ===============================
// CARREGAR IDS DE VAGAS SALVAS
// ===============================

async function carregarVagasSalvasIds() {

    try {

        const resposta = await fetchComAuth(
            `${API_URL_BASE}/vagas-salvas`,
            { method: "GET" }
        );

        if (!resposta.ok) {
            return;
        }

        const ids = await resposta.json();

        if (Array.isArray(ids)) {
            ids.forEach(id => vagasSalvas.add(String(id)));
        }

    } catch (error) {
        console.warn("Erro ao carregar vagas salvas:", error);
    }
}


// ===============================
// ALTERNAR SALVAMENTO (coração)
// ===============================

async function alternarSalvarDashboard(event, btn, idVaga) {

    event.preventDefault();
    event.stopPropagation();

    const id = String(idVaga);
    const estavaSalva = vagasSalvas.has(id);

    // Atualização otimista

    if (estavaSalva) {
        vagasSalvas.delete(id);
        btn.classList.remove("saved");
    } else {
        vagasSalvas.add(id);
        btn.classList.add("saved");
    }

    try {

        const resposta = await fetchComAuth(
            `${API_URL_BASE}/vagas-salvas/${id}`,
            { method: "POST" }
        );

        if (!resposta.ok) {
            throw new Error("Falha ao salvar vaga");
        }

        const dados = await resposta.json();

        if (dados.salva) {
            vagasSalvas.add(id);
            btn.classList.add("saved");
        } else {
            vagasSalvas.delete(id);
            btn.classList.remove("saved");
        }

    } catch (error) {

        console.error("Erro ao salvar vaga:", error);

        // Desfaz atualização otimista

        if (estavaSalva) {
            vagasSalvas.add(id);
            btn.classList.add("saved");
        } else {
            vagasSalvas.delete(id);
            btn.classList.remove("saved");
        }
    }

    return false;
}

window.alternarSalvarDashboard = alternarSalvarDashboard;


// ===============================
// CARREGAR VAGAS
// ===============================

async function carregarVagasDashboard() {

    try {

        // Garante que já sabemos quais vagas estão salvas
        // antes de montar os cards.
        await carregarVagasSalvasIds();

        const resposta = await fetchComAuth(API_URL_VAGAS, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao carregar vagas");
        }

        const pagina = await resposta.json();

        console.log("Vagas recebidas:", pagina);

        preencherVagas(pagina.content);

    } catch (error) {

        console.error(error);

    }

}



// ===============================
// CRIAR CARDS DAS VAGAS
// ===============================


function preencherVagas(vagas) {

    const container = document.getElementById("recomendadas-list");

    container.innerHTML = "";

    if (!vagas || vagas.length === 0) {

        container.innerHTML = `
        <div class="empty-state">
            Nenhuma vaga encontrada.
        </div>
        `;

        return;
    }

    vagas.forEach(vaga => {

        const card = document.createElement("a");

        // ABRE A PAGINA DE DETALHE
        card.href = `vaga-detalhe.html?id=${vaga.idVaga}`;

        card.className = "vaga";

        // FILTROS (agora usando os mesmos normalizadores do filtro)
        card.dataset.tipo = normalizarTipo(vaga.tipoEmprego);
        card.dataset.area = normalizarTexto(vaga.area);

        const jaSalva = vagasSalvas.has(String(vaga.idVaga));
        const savedClass = jaSalva ? " saved" : "";

        card.innerHTML = `

    <div class="vaga-logo"
    style="background:#E6F1FB;color:#0C447C">

        ${vaga.nomeEmpresa
                .substring(0, 2)
                .toUpperCase()
            }

    </div>

    <div class="vaga-body">

        <div class="vaga-top">

            <div>

                <div class="vaga-title">
                    ${vaga.nome ?? "Vaga disponível"}
                </div>

                <div class="vaga-company">
                    ${vaga.nomeEmpresa} · ${vaga.localEmpresa}
                </div>

            </div>

            <div class="match-badge match-high">
                <i class="ti ti-bolt"></i>
                Match
            </div>

        </div>

        <div class="vaga-tags">

            <span class="vtag area">
                ${vaga.area ?? "Tecnologia"}
            </span>

            <span class="vtag tech">
                ${vaga.linguagens ?? vaga.frameworks ?? ""}
            </span>

        </div>

        <div class="vaga-footer">

            <span class="vaga-meta">
                <i class="ti ti-coin"></i>
                ${vaga.remuneracao ?? "Não informado"}
            </span>

            <span class="vaga-meta">
                <i class="ti ti-map-pin"></i>
                ${vaga.localEmpresa}
            </span>

            <button
            class="save-btn${savedClass}"
            onclick="return alternarSalvarDashboard(event, this, ${vaga.idVaga})">
                <i class="ti ti-heart"></i>
            </button>

        </div>

    </div>

    `;

        container.appendChild(card);

    });

    // Reaplica o filtro atual (se algum chip já estiver selecionado)
    // agora que os cards existem no DOM.
    aplicarFiltroRecomendadas();

}



// ===============================
// USUARIO
// ===============================


async function carregarUsuario() {

    try {

        const resposta = await fetchComAuth(API_URL, {
            method: "GET"
        });

        if (!resposta.ok) {
            window.location.href = "login.html";
            return;
        }

        const usuario = await resposta.json();

        console.log(usuario);

        preencherDados(usuario);

    } catch (error) {

        console.error(error);

    }

}


// ===============================
// PREENCHER PERFIL
// ===============================


function preencherDados(usuario) {

    document.querySelector(".profile-name").textContent =
        usuario.nomeCompleto;

    document.getElementById("nome-topbar").textContent =
        " " + usuario.nomeCompleto.split(" ")[0];

    document.querySelector(".profile-sub").textContent =
        `${usuario.curso} · UEPB`;

    document.querySelector(".profile-status").innerHTML =
        `
<div class="profile-dot"></div>
${usuario.situacaoEmpregabilidade}
`;

    document.querySelector(".profile-stat span").textContent =
        usuario.periodo;

    const iniciais =
        usuario.nomeCompleto
            .split(" ")
            .map(nome => nome[0])
            .slice(0, 2)
            .join("");

    document.querySelector(".avatar").textContent =
        iniciais;

    document.querySelector(".av-circle").textContent =
        iniciais;

    // ---------------------------------------------------
    // SIDEBAR (nav-avatar) — antes fixo como "Maria Silva"
    // ---------------------------------------------------

    const navAvCircle = document.getElementById("navAvCircle");

    if (navAvCircle) {
        navAvCircle.textContent = iniciais;
    }

    const navAvNome = document.getElementById("navAvNome");

    if (navAvNome) {
        // Mostra só nome + sobrenome, pra não estourar o espaço da sidebar
        const partesNome = usuario.nomeCompleto.split(" ");
        navAvNome.textContent = partesNome.slice(0, 2).join(" ");
    }

    const navAvInfo = document.getElementById("navAvInfo");

    if (navAvInfo) {
        // Sigla do curso (opcional: trocar por usuario.curso completo se preferir)
        navAvInfo.textContent = `${usuario.curso} · ${usuario.periodo}`;
    }

    const areas =
        document.getElementById("areas-container");

    areas.innerHTML = "";

    usuario.areasAfinidades.forEach(area => {

        const span = document.createElement("span");
        span.className = "ptag area";
        span.textContent = area;
        areas.appendChild(span);

    });

    renderTagList("linguagens-container", usuario.linguagens);
    renderTagList("frameworks-container", usuario.frameworks);
    renderTagList("cloud-container", usuario.clouds);
    renderTagList("bancoDados-container", usuario.bancoDados);

}


function renderTagList(id, lista) {

    const container = document.getElementById(id);

    container.innerHTML = "";

    if (!lista || lista.length === 0) {
        container.innerHTML = "<span>Nenhuma selecionada</span>";
        return;
    }

    lista.forEach(item => {

        const span = document.createElement("span");
        span.className = "ptag tech";
        span.textContent = item;
        container.appendChild(span);

    });

}


// ===============================
// INICIAR
// ===============================

carregarUsuario();
carregarVagasDashboard();