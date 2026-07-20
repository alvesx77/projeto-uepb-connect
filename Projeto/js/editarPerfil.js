// ---------------------------------------------------------------
// Elementos
// ---------------------------------------------------------------
const Inome = document.querySelector(".nomeCompleto");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");
const Icurso = document.querySelector(".curso");
const Iperiodo = document.querySelector(".periodo");
const Imatricula = document.querySelector(".matricula");
const Icurriculo = document.querySelector(".curriculo");
const Ilinkedin = document.querySelector(".url-linkedin");
const Igithub = document.querySelector(".url-github");
const Iportfolio = document.querySelector(".url-portfolio");
const btnSalvar = document.getElementById("btnSalvar");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
const formArea = document.getElementById("form-area");
const perfilSuccess = document.getElementById("perfil-success");
const psResumo = document.getElementById("ps-resumo");
const btnContinuarEditando = document.getElementById("btnContinuarEditando");

const STATUS_LABELS = {
    buscando: "Buscando oportunidade",
    empregado_area: "Empregado na área",
    empregado_fora: "Empregado fora da área",
    estudando: "Só estudando"
};


// ---------------------------------------------------------------
// Situação de empregabilidade (mesmo padrão da tela 2 do cadastro)
// ---------------------------------------------------------------
function selectStatus(el) {
    document.querySelectorAll(".status-card").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
}
function getStatusSelecionado() {
    const card = document.querySelector(".status-card.selected");
    return card ? card.dataset.value : null;
}

// ---------------------------------------------------------------
// Chips de área/tecnologia (mesmo padrão da tela 3 do cadastro)
// ---------------------------------------------------------------
function toggleChip(el) {
    const cls = el.dataset.type === "area" ? "sel-area" : "sel-tech";
    el.classList.toggle(cls);
    atualizarContadores();
}
function atualizarContadores() {
    document.getElementById("area-count").textContent = document.querySelectorAll(".chip.sel-area").length + " selecionadas";
    document.getElementById("tech-count").textContent = document.querySelectorAll(".chip.sel-tech").length + " selecionadas";
}

function marcarChipsPorTexto(lista, seletorContainer, classeSelecao) {
    if (!Array.isArray(lista)) return;
    document.querySelectorAll(seletorContainer).forEach(chip => {
        if (lista.includes(chip.textContent.trim())) {
            chip.classList.add(classeSelecao);
        }
    });
}

// ---------------------------------------------------------------
// Carrega os dados já salvos (localStorage por enquanto) e
// preenche o formulário inteiro
// ---------------------------------------------------------------
function carregarDados() {
    // TODO: quando a API estiver conectada, trocar por:
    // fetch("https://SUA_API/profile/me", { headers: { Authorization: "Bearer " + token }})
    //   .then(res => res.json())
    //   .then(preencherFormulario);
    const dados = JSON.parse(localStorage.getItem("cadastroTela")) || {};
    preencherFormulario(dados);
}

function preencherFormulario(dados) {
    if (dados.nomeCompleto) Inome.value = dados.nomeCompleto;
    if (dados.emailInstitucional) Iemail.value = dados.emailInstitucional;
    if (dados.telefone) Itelefone.value = dados.telefone;
    if (dados.curso) Icurso.value = dados.curso;
    if (dados.periodo) Iperiodo.value = dados.periodo;
    if (dados.matricula) Imatricula.value = dados.matricula;
    if (dados.curriculo) Icurriculo.value = dados.curriculo;
    if (dados.linkLinkedin) Ilinkedin.value = dados.linkLinkedin;
    if (dados.linkGithub) Igithub.value = dados.linkGithub;
    if (dados.linkPortifolio) Iportfolio.value = dados.linkPortifolio;

    if (dados.situacaoEmpregabilidade) {
        const card = document.querySelector(`.status-card[data-value="${dados.situacaoEmpregabilidade}"]`);
        if (card) card.classList.add("selected");
    }

    marcarChipsPorTexto(dados.areasAfinidade, '.chip[data-type="area"]', "sel-area");
    [dados.linguagens, dados.frameworks, dados.cloud, dados.bancoDados]
        .forEach(lista => marcarChipsPorTexto(lista, '.chip[data-type="tech"]', "sel-tech"));
    atualizarContadores();

    if (dados.visibilidadePerfil) {
        const radio = document.querySelector(`input[name="vis"][value="${dados.visibilidadePerfil}"]`);
        if (radio) radio.checked = true;
    }
}

// ---------------------------------------------------------------
// Coleta tudo que está no formulário
// ---------------------------------------------------------------
function coletarDadosFormulario() {
    const areasAfinidade = [...document.querySelectorAll(".sel-area")].map(el => el.textContent.trim());

    const linguagens = [];
    const frameworks = [];
    const cloud = [];
    const bancoDados = [];

    document.querySelectorAll(".sel-tech").forEach(el => {
        const nome = el.textContent.trim();
        switch (el.dataset.category) {
            case "linguagens": linguagens.push(nome); break;
            case "frameworks": frameworks.push(nome); break;
            case "cloud": cloud.push(nome); break;
            case "bancoDados": bancoDados.push(nome); break;
        }
    });

    const visSelecionada = document.querySelector('input[name="vis"]:checked');

    return {
        nomeCompleto: Inome.value,
        emailInstitucional: Iemail.value,
        telefone: Itelefone.value,
        curso: Icurso.value,
        periodo: Iperiodo.value,
        matricula: Imatricula.value,
        curriculo: Icurriculo.value,
        situacaoEmpregabilidade: getStatusSelecionado(),
        areasAfinidade,
        linguagens,
        frameworks,
        cloud,
        bancoDados,
        linkLinkedin: Ilinkedin.value,
        linkGithub: Igithub.value,
        linkPortifolio: Iportfolio.value,
        visibilidadePerfil: visSelecionada ? visSelecionada.value : "todos"
    };
}

function mostrarToast(msg) {
    toastText.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// ---------------------------------------------------------------
// Tela de sucesso pós-salvamento
// ---------------------------------------------------------------
function linhaResumo(label, valor, padrao = "Não informado") {
    const texto = valor && String(valor).trim() !== "" ? valor : padrao;
    return `<div class="ps-row"><span>${label}</span><span>${texto}</span></div>`;
}

function montarResumo(dados) {
    const tecnologias = [
        ...(dados.linguagens || []),
        ...(dados.frameworks || []),
        ...(dados.cloud || []),
        ...(dados.bancoDados || [])
    ];

    psResumo.innerHTML =
        linhaResumo("Nome completo", dados.nomeCompleto) +
        linhaResumo("E-mail", dados.emailInstitucional) +
        linhaResumo("Telefone", dados.telefone) +
        linhaResumo("Curso", dados.curso) +
        linhaResumo("Período", dados.periodo) +
        linhaResumo("Situação", STATUS_LABELS[dados.situacaoEmpregabilidade], "Não informada") +
        linhaResumo("Áreas de afinidade", (dados.areasAfinidade || []).join(", "), "Nenhuma selecionada") +
        linhaResumo("Tecnologias", tecnologias.join(", "), "Nenhuma selecionada");
}

function mostrarTelaSucesso(dados) {
    montarResumo(dados);
    formArea.style.display = "none";
    perfilSuccess.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (btnContinuarEditando) {
    btnContinuarEditando.addEventListener("click", () => {
        perfilSuccess.style.display = "none";
        formArea.style.display = "block";
    });
}

// ---------------------------------------------------------------
// Salvar alterações
// ---------------------------------------------------------------
btnSalvar.addEventListener("click", () => {
    const dadosAtualizados = coletarDadosFormulario();

    // TODO: quando a API estiver conectada, trocar por:
    // fetch("https://SUA_API/profile/me", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    //   body: JSON.stringify(dadosAtualizados)
    // })
    //   .then(() => mostrarToast("Perfil atualizado com sucesso!"))
    //   .catch(() => mostrarToast("Não foi possível salvar. Tente novamente."));

    localStorage.setItem("cadastroTela", JSON.stringify(dadosAtualizados));
    mostrarTelaSucesso(dadosAtualizados);
});

document.addEventListener("DOMContentLoaded", carregarDados);