// ---------------------------------------------------------------
// Tela de visualização do perfil (somente leitura)
// ---------------------------------------------------------------

const STATUS_LABELS = {
    buscando: "Buscando oportunidade",
    empregado_area: "Empregado na área",
    empregado_fora: "Empregado fora da área",
    estudando: "Só estudando"
};

const VIS_LABELS = {
    todos: "Visível para empresas e recrutadores parceiros da UEPB",
    recrutadores: "Visível apenas para recrutadores (não para outros alunos)",
    privado: "Perfil privado (visível apenas para a coordenação)"
};

function iniciaisDoNome(nome) {
    if (!nome || !nome.trim()) return "??";
    const partes = nome.trim().split(/\s+/);
    const primeira = partes[0][0] || "";
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
    return (primeira + ultima).toUpperCase();
}

// Preenche um campo de texto simples, marcando com estilo "vazio" quando não houver valor
function preencherTexto(elId, valor, padrao = "Não informado") {
    const el = document.getElementById(elId);
    const temValor = valor && String(valor).trim() !== "";
    el.textContent = temValor ? valor : padrao;
    el.classList.toggle("pv-empty", !temValor);
}

// Preenche um campo de link, transformando em <a> clicável quando houver URL
function preencherLink(elId, valor) {
    const el = document.getElementById(elId);
    const temValor = valor && String(valor).trim() !== "";
    if (!temValor) {
        el.textContent = "Não informado";
        el.classList.add("pv-empty");
        return;
    }
    el.classList.remove("pv-empty");
    const href = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    el.innerHTML = "";
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = valor;
    el.appendChild(a);
}

function renderChips(container, lista) {
    container.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = '<span class="pv-chip-empty">Nenhuma selecionada</span>';
        return;
    }
    lista.forEach(item => {
        const span = document.createElement("span");
        span.className = "chip sel-area";
        span.textContent = item;
        container.appendChild(span);
    });
}

// ---------------------------------------------------------------
// Carrega os dados já salvos (localStorage por enquanto) e
// preenche a tela inteira
// ---------------------------------------------------------------
function carregarPerfil() {
    // TODO: quando a API estiver conectada, trocar por:
    // fetch("https://SUA_API/profile/me", { headers: { Authorization: "Bearer " + token }})
    //   .then(res => res.json())
    //   .then(preencherTela);
    const dados = JSON.parse(localStorage.getItem("cadastroTela")) || {};
    console.log("Dados do perfil carregados:", dados);
    preencherTela(dados);
}

function preencherTela(dados) {
    document.getElementById("pv-avatar").textContent = iniciaisDoNome(dados.nomeCompleto);
    document.getElementById("pv-nome").textContent = dados.nomeCompleto && dados.nomeCompleto.trim()
        ? dados.nomeCompleto
        : "Nome não informado";
    document.getElementById("pv-curso-sub").textContent =
        [dados.curso, dados.periodo].filter(Boolean).join(" · ") || "Curso não informado";
    document.getElementById("pv-status").textContent =
        STATUS_LABELS[dados.situacaoEmpregabilidade] || "Situação não informada";

    preencherTexto("pv-nomeCompleto", dados.nomeCompleto);
    preencherTexto("pv-email", dados.emailInstitucional);
    preencherTexto("pv-telefone", dados.telefone);

    preencherTexto("pv-curso", dados.curso);
    preencherTexto("pv-periodo", dados.periodo);
    preencherTexto("pv-matricula", dados.matricula);
    preencherLink("pv-curriculo", dados.curriculo);

    renderChips(document.getElementById("pv-areas"), dados.areasAfinidade);

    const tecnologias = [
        ...(dados.linguagens || []),
        ...(dados.frameworks || []),
        ...(dados.cloud || []),
        ...(dados.bancoDados || [])
    ];
    renderChips(document.getElementById("pv-tecnologias"), tecnologias);

    preencherLink("pv-linkedin", dados.linkLinkedin);
    preencherLink("pv-github", dados.linkGithub);
    preencherLink("pv-portfolio", dados.linkPortifolio);

    document.getElementById("pv-visibilidade").textContent =
        VIS_LABELS[dados.visibilidadePerfil] || VIS_LABELS.todos;
}

document.addEventListener("DOMContentLoaded", carregarPerfil);