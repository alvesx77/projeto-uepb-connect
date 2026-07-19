// ---------------------------------------------------------------
// Dataset de exemplo. Quando a API estiver pronta, troque a
// atribuição abaixo por uma chamada real, ex:
//
// let TODAS_VAGAS = [];
// fetch("https://SUA_API/vagas")
//   .then(res => res.json())
//   .then(data => { TODAS_VAGAS = data; aplicarFiltros(); });
// ---------------------------------------------------------------
const TODAS_VAGAS = [
    {
        id: "v1", titulo: "Estágio em ciência de dados", empresa: "SertãoLabs", local: "Campina Grande, PB",
        tipo: "estagio", modalidade: "presencial", area: "Ciência de dados", match: 97,
        remuneracao: 1200, remuneracaoTexto: "R$ 1.200/mês", publicadoHa: "Há 1 dia", diasAtras: 1,
        tags: [{ label: "Ciência de dados", tipo: "area" }, { label: "Python", tipo: "tech" }, { label: "TensorFlow", tipo: "tech" }, { label: "Estágio", tipo: "tipo" }],
        logoIniciais: "SL", logoBg: "#E6F1FB", logoColor: "#0C447C"
    },
    {
        id: "v2", titulo: "Estágio em machine learning", empresa: "NexaTech", local: "Recife, PE",
        tipo: "estagio", modalidade: "remoto", area: "Inteligência artificial", match: 91,
        remuneracao: 1500, remuneracaoTexto: "R$ 1.500/mês", publicadoHa: "Há 2 dias", diasAtras: 2,
        tags: [{ label: "Inteligência artificial", tipo: "area" }, { label: "Python", tipo: "tech" }, { label: "PyTorch", tipo: "tech" }, { label: "Estágio", tipo: "tipo" }],
        logoIniciais: "NX", logoBg: "#EEEDFE", logoColor: "#3C3489"
    },
    {
        id: "v3", titulo: "Analista de dados júnior", empresa: "DataGov PB", local: "João Pessoa, PB",
        tipo: "clt", modalidade: "hibrido", area: "Ciência de dados", match: 88,
        remuneracao: 2800, remuneracaoTexto: "R$ 2.800/mês", publicadoHa: "Há 3 dias", diasAtras: 3,
        tags: [{ label: "Ciência de dados", tipo: "area" }, { label: "Python", tipo: "tech" }, { label: "Java", tipo: "tech" }, { label: "CLT", tipo: "tipo" }],
        logoIniciais: "DG", logoBg: "#E1F5EE", logoColor: "#085041"
    },
    {
        id: "v4", titulo: "Estágio em desenvolvimento web", empresa: "Coruja Digital", local: "Remoto",
        tipo: "estagio", modalidade: "remoto", area: "Desenvolvimento web", match: 74,
        remuneracao: 1000, remuneracaoTexto: "R$ 1.000/mês", publicadoHa: "Há 4 dias", diasAtras: 4,
        tags: [{ label: "Desenvolvimento web", tipo: "area" }, { label: "React", tipo: "tech" }, { label: "Node.js", tipo: "tech" }, { label: "Estágio", tipo: "tipo" }],
        logoIniciais: "CR", logoBg: "#FAEEDA", logoColor: "#633806"
    },
    {
        id: "v5", titulo: "Desenvolvedor mobile freelancer", empresa: "AppFácil", local: "Remoto",
        tipo: "freelance", modalidade: "remoto", area: "Desenvolvimento mobile", match: 69,
        remuneracao: 3500, remuneracaoTexto: "R$ 3.500 (projeto)", publicadoHa: "Há 5 dias", diasAtras: 5,
        tags: [{ label: "Desenvolvimento mobile", tipo: "area" }, { label: "Flutter", tipo: "tech" }, { label: "Freelance", tipo: "tipo" }],
        logoIniciais: "AF", logoBg: "#FDE8E8", logoColor: "#9B2C2C"
    },
    {
        id: "v6", titulo: "Estágio em DevOps", empresa: "CloudPB", local: "Campina Grande, PB",
        tipo: "estagio", modalidade: "hibrido", area: "DevOps / Cloud", match: 82,
        remuneracao: 1300, remuneracaoTexto: "R$ 1.300/mês", publicadoHa: "Há 6 dias", diasAtras: 6,
        tags: [{ label: "DevOps / Cloud", tipo: "area" }, { label: "Docker", tipo: "tech" }, { label: "AWS", tipo: "tech" }, { label: "Estágio", tipo: "tipo" }],
        logoIniciais: "CP", logoBg: "#E6F1FB", logoColor: "#0C447C"
    },
    {
        id: "v7", titulo: "UX/UI Designer pleno", empresa: "Studio Nordeste", local: "João Pessoa, PB",
        tipo: "clt", modalidade: "presencial", area: "UX / Design de produto", match: 58,
        remuneracao: 4200, remuneracaoTexto: "R$ 4.200/mês", publicadoHa: "Há 1 semana", diasAtras: 7,
        tags: [{ label: "UX / Design de produto", tipo: "area" }, { label: "Figma", tipo: "tech" }, { label: "CLT", tipo: "tipo" }],
        logoIniciais: "SN", logoBg: "#EEEDFE", logoColor: "#3C3489"
    },
    {
        id: "v8", titulo: "Estágio em inteligência artificial", empresa: "Neurax", local: "Remoto",
        tipo: "estagio", modalidade: "remoto", area: "Inteligência artificial", match: 94,
        remuneracao: 1600, remuneracaoTexto: "R$ 1.600/mês", publicadoHa: "Há 8 dias", diasAtras: 8,
        tags: [{ label: "Inteligência artificial", tipo: "area" }, { label: "Python", tipo: "tech" }, { label: "TensorFlow", tipo: "tech" }, { label: "Estágio", tipo: "tipo" }],
        logoIniciais: "NX", logoBg: "#E1F5EE", logoColor: "#085041"
    }
];

const vagasSalvas = new Set();

const searchInput = document.getElementById("search-input");
const vagaList = document.getElementById("vaga-list");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const sortSelect = document.getElementById("sortSelect");
const matchRange = document.getElementById("matchRange");
const matchRangeVal = document.getElementById("matchRangeVal");

// ---------------------------------------------------------------
// Lê o estado atual de todos os filtros da tela
// ---------------------------------------------------------------
function lerFiltrosAtivos() {
    const porGrupo = (grupo) => [...document.querySelectorAll(`input[data-group="${grupo}"]:checked`)].map(i => i.value);

    return {
        busca: searchInput.value.trim().toLowerCase(),
        tipos: porGrupo("tipo"),
        modalidades: porGrupo("modalidade"),
        areas: porGrupo("area"),
        matchMinimo: Number(matchRange.value),
        ordenar: sortSelect.value
    };
}

function vagaPassaNoFiltro(vaga, filtros) {
    if (filtros.busca && !(vaga.titulo.toLowerCase().includes(filtros.busca) || vaga.empresa.toLowerCase().includes(filtros.busca))) {
        return false;
    }
    if (filtros.tipos.length && !filtros.tipos.includes(vaga.tipo)) return false;
    if (filtros.modalidades.length && !filtros.modalidades.includes(vaga.modalidade)) return false;
    if (filtros.areas.length && !filtros.areas.includes(vaga.area)) return false;
    if (vaga.match < filtros.matchMinimo) return false;
    return true;
}

function ordenarVagas(lista, criterio) {
    const copia = [...lista];
    if (criterio === "match") copia.sort((a, b) => b.match - a.match);
    else if (criterio === "salario") copia.sort((a, b) => b.remuneracao - a.remuneracao);
    else copia.sort((a, b) => a.diasAtras - b.diasAtras); // mais recentes primeiro
    return copia;
}

// ---------------------------------------------------------------
// Renderização
// ---------------------------------------------------------------
function vagaCardHtml(v) {
    const matchClass = v.match >= 85 ? "match-high" : "match-med";
    const savedClass = vagasSalvas.has(v.id) ? " saved" : "";
    const tagsHtml = v.tags.map(t => `<span class="vtag ${t.tipo}">${t.label}</span>`).join("");

    return `
      <a href="vaga-detalhe.html?id=${v.id}" class="vaga" data-vaga-id="${v.id}">
        <div class="vaga-logo" style="background:${v.logoBg};color:${v.logoColor}">${v.logoIniciais}</div>
        <div class="vaga-body">
          <div class="vaga-top">
            <div>
              <div class="vaga-title">${v.titulo}</div>
              <div class="vaga-company">${v.empresa} · ${v.local}</div>
            </div>
            <div class="match-badge ${matchClass}"><i class="ti ti-bolt" style="font-size:11px"></i> ${v.match}% match</div>
          </div>
          <div class="vaga-tags">${tagsHtml}</div>
          <div class="vaga-footer">
            <span class="vaga-meta"><i class="ti ti-coin"></i> ${v.remuneracaoTexto}</span>
            <span class="vaga-meta"><i class="ti ti-clock"></i> ${v.publicadoHa}</span>
            <button class="save-btn${savedClass}" onclick="return alternarSalvar(event, this, '${v.id}')" aria-label="Salvar"><i class="ti ti-heart"></i></button>
          </div>
        </div>
      </a>`;
}

function alternarSalvar(event, btn, vagaId) {
    event.preventDefault();
    if (vagasSalvas.has(vagaId)) {
        vagasSalvas.delete(vagaId);
        btn.classList.remove("saved");
    } else {
        vagasSalvas.add(vagaId);
        btn.classList.add("saved");
    }
    // TODO: chamar a API real aqui, ex:
    // fetch(`https://SUA_API/vagas/${vagaId}/salvar`, { method: vagasSalvas.has(vagaId) ? "POST" : "DELETE" });
    return false;
}
window.alternarSalvar = alternarSalvar;

function aplicarFiltros() {
    const filtros = lerFiltrosAtivos();
    const filtradas = ordenarVagas(TODAS_VAGAS.filter(v => vagaPassaNoFiltro(v, filtros)), filtros.ordenar);

    resultsCount.textContent = filtradas.length;

    if (filtradas.length === 0) {
        vagaList.innerHTML = "";
        emptyState.classList.add("show");
        return;
    }
    emptyState.classList.remove("show");
    vagaList.innerHTML = filtradas.map(vagaCardHtml).join("");
}

// ---------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------
let debounceTimer;
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(aplicarFiltros, 250);
});

document.querySelectorAll('input[data-group]').forEach(input => {
    input.addEventListener("change", aplicarFiltros);
});

sortSelect.addEventListener("change", aplicarFiltros);

matchRange.addEventListener("input", () => {
    matchRangeVal.textContent = matchRange.value + "%";
    aplicarFiltros();
});

function limparFiltros() {
    searchInput.value = "";
    document.querySelectorAll('input[data-group]').forEach(i => i.checked = false);
    matchRange.value = 0;
    matchRangeVal.textContent = "0%";
    sortSelect.value = "recentes";
    aplicarFiltros();
}
document.getElementById("btnLimpar").addEventListener("click", limparFiltros);
document.getElementById("btnLimparVazio").addEventListener("click", limparFiltros);

aplicarFiltros();
