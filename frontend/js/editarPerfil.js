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

const errorBox = document.getElementById("perfil-error");

function mostrarErro(msg){

    errorBox.textContent = msg;
    errorBox.classList.add("show");

}


function esconderErro(){

    errorBox.classList.remove("show");

}

function formatarTelefone(valor){

    const digitos = valor
        .replace(/\D/g,"")
        .slice(0,11);


    if(digitos.length > 10){
        return digitos.replace(
            /(\d{2})(\d{5})(\d{0,4})/,
            "($1)$2-$3"
        );
    }


    if(digitos.length > 6){

        return digitos.replace(
            /(\d{2})(\d{4})(\d{0,4})/,
            "($1)$2-$3"
        );

    }


    if(digitos.length > 2){

        return digitos.replace(
            /(\d{2})(\d{0,5})/,
            "($1)$2"
        );

    }


    if(digitos.length > 0){

        return digitos.replace(
            /(\d{0,2})/,
            "($1"
        );

    }


    return digitos;
}

Itelefone.addEventListener("input",()=>{
    Itelefone.value = formatarTelefone(
        Itelefone.value
    );
});

// ---------------------------------------------------------------
// REGEX DE VALIDAÇÃO
// ---------------------------------------------------------------

const REGEX = {
    nome: /^[A-Za-zÀ-ÖØ-öø-ÿ']+(\s[A-Za-zÀ-ÖØ-öø-ÿ']+)+$/,
    
    emailInstitucional:
        /^[\w.+-]+@(aluno|servidor)\.uepb\.edu\.br$/i,

    telefone:
        /^\(\d{2}\)\d{5}-\d{4}$/,

    matricula:
        /^\d{9}$/,

    lattes:
        /^https?:\/\/lattes\.cnpq\.br\/\d+$/i,

    linkedin:
        /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/i,

    github:
        /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/i,

    portfolio:
        /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i
};


// ---------------------------------------------------------------
// VALIDAÇÕES
// ---------------------------------------------------------------

function validarNome() {
    return REGEX.nome.test(Inome.value.trim());
}


function validarEmail() {
    return REGEX.emailInstitucional.test(
        Iemail.value.trim()
    );
}


function validarTelefone() {
    return REGEX.telefone.test(
        Itelefone.value.trim()
    );
}


function validarCurso() {
    return Icurso.value.trim() !== "";
}


function validarPeriodo() {
    return Iperiodo.value.trim() !== "";
}


function validarMatricula() {

    const valor = Imatricula.value.trim();

    if(valor === "")
        return true;

    return REGEX.matricula.test(valor);
}


function validarCurriculo(){

    const valor = Icurriculo.value.trim();

    if(valor === "")
        return true;

    return REGEX.lattes.test(valor);
}


function validarLinkedin(){

    const valor = Ilinkedin.value.trim();

    if(valor === "")
        return true;

    return REGEX.linkedin.test(valor);
}


function validarGithub(){

    const valor = Igithub.value.trim();

    if(valor === "")
        return true;

    return REGEX.github.test(valor);
}


function validarPortfolio(){

    const valor = Iportfolio.value.trim();

    if(valor === "")
        return true;

    return REGEX.portfolio.test(valor);
}


function validarStatus(){

    return getStatusSelecionado() !== null;
}


function validarAreas(){

    return document.querySelectorAll(".sel-area").length > 0;

}


function validarTecnologias(){

    return document.querySelectorAll(".sel-tech").length > 0;

}



// ---------------------------------------------------------------
// VALIDAÇÃO GERAL
// ---------------------------------------------------------------

function validarFormularioEdicao(){

    esconderErro();

    if(!validarNome()){
        mostrarErro(
            "Informe o nome completo."
        );
        return false;
    }


    if(!validarEmail()){
        mostrarErro(
            "Use um email institucional UEPB válido."
        );
        return false;
    }


    if(!validarTelefone()){
        mostrarErro(
            "Telefone inválido. Use (99)99999-9999."
        );
        return false;
    }


    if(!validarCurso()){
        mostrarErro(
            "Informe o curso."
        );
        return false;
    }


    if(!validarPeriodo()){
        mostrarErro(
            "Informe o período."
        );
        return false;
    }


    if(!validarMatricula()){
        mostrarErro(
            "Matrícula inválida."
        );
        return false;
    }


    if(!validarCurriculo()){
        mostrarErro(
            "Currículo Lattes inválido."
        );
        return false;
    }


    if(!validarStatus()){
        mostrarErro(
            "Selecione sua situação de empregabilidade."
        );
        return false;
    }


    if(!validarAreas()){
        mostrarErro(
            "Selecione pelo menos uma área de afinidade."
        );
        return false;
    }


    if(!validarTecnologias()){
        mostrarErro(
            "Selecione pelo menos uma tecnologia."
        );
        return false;
    }


    if(!validarLinkedin()){
        mostrarErro(
            "LinkedIn inválido."
        );
        return false;
    }


    if(!validarGithub()){
        mostrarErro(
            "GitHub inválido."
        );
        return false;
    }


    if(!validarPortfolio()){
        mostrarErro(
            "Portfólio inválido."
        );
        return false;
    }


    return true;
}

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

function normalizar(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function marcarChipsPorTexto(lista, seletorContainer, classeSelecao) {
    if (!Array.isArray(lista)) return;

    const listaNormalizada = lista.map(normalizar);

    document.querySelectorAll(seletorContainer).forEach(chip => {
        if (listaNormalizada.includes(normalizar(chip.textContent))) {
            chip.classList.add(classeSelecao);
        }
    });
}

// ---------------------------------------------------------------
// Carrega os dados já salvos (localStorage por enquanto) e
// preenche o formulário inteiro
// ---------------------------------------------------------------
function carregarDados() {
    fetch("https://projeto-uepb-connect-production.up.railway.app/retornarDadosEditarPerfil", {
        method: "GET",
        credentials: "include"
    })
    .then(res => {
        if (res.status === 401 || res.status === 403) {
            throw new Error("Sessão expirada, faça login novamente");
        }
        if (!res.ok) {
            throw new Error("Erro ao carregar dados do perfil");
        }
        return res.json();
    })
    .then(preencherFormulario)
    .catch(err => {
        console.error(err);
        mostrarToast(err.message);
    });
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

    const nomeSidebar = document.getElementById("nomeCompelo");
    const periodoSidebar = document.getElementById("periodo");

    if (dados.nomeCompleto && nomeSidebar) {
        nomeSidebar.textContent = dados.nomeCompleto;
    }

    if (dados.periodo && periodoSidebar) {
        periodoSidebar.textContent = dados.periodo;
    }

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

    if(!validarFormularioEdicao()){
        return;
    }

    const dadosAtualizados = coletarDadosFormulario();

    fetch("https://projeto-uepb-connect-production.up.railway.app/editarDadosPerfil", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(res => {
        if (res.status === 401 || res.status === 403) {
            throw new Error("Sessão expirada, faça login novamente");
        }
        if (!res.ok) {
            return res.json()
                .then(erro => { throw new Error(erro.message || "Erro ao salvar perfil"); })
                .catch(() => { throw new Error("Erro ao salvar perfil"); });
        }
        return res.json();
    })
    .then(dadosSalvos => {
        mostrarTelaSucesso(dadosSalvos);
    })
    .catch(err => {
        console.error(err);
        mostrarToast(err.message);
    });
});

document.addEventListener("DOMContentLoaded", carregarDados);