const API_URL = "http://localhost:8080/vagas";

// ===============================================================
// VAGAS
// ===============================================================

let TODAS_VAGAS = [];


// ===============================================================
// CARREGAR VAGAS DA API
// ===============================================================

async function carregarVagas() {

    try {

        const resposta = await fetch(API_URL, {
            method: "GET",
            credentials: "include"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao buscar vagas");
        }

        const dados = await resposta.json();

        console.log("Vagas recebidas da API:", dados);

        TODAS_VAGAS = dados.map(vaga => transformarVaga(vaga));

        console.log("Vagas transformadas:", TODAS_VAGAS);

        aplicarFiltros();

    } catch (error) {

        console.error("Erro ao carregar vagas:", error);

        TODAS_VAGAS = [];

        aplicarFiltros();
    }
}


// ===============================================================
// TRANSFORMAR VAGA DA API PARA O FORMATO DO FRONTEND
// ===============================================================

function transformarVaga(vaga) {

    const linguagens = vaga.linguagens
        ? vaga.linguagens
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : [];

    const frameworks = vaga.frameworks
        ? vaga.frameworks
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : [];


    // ===========================================================
    // TAGS
    // ===========================================================

    const tags = [];

    if (vaga.area) {
        tags.push({
            label: vaga.area,
            tipo: "area"
        });
    }


    linguagens.forEach(linguagem => {

        tags.push({
            label: linguagem,
            tipo: "tech"
        });

    });


    frameworks.forEach(framework => {

        tags.push({
            label: framework,
            tipo: "tech"
        });

    });


    // ===========================================================
    // TIPO DE EMPREGO
    // ===========================================================

    let tipo = "";

    switch (vaga.tipoEmprego) {

        case "ESTAGIO":
            tipo = "estagio";
            break;

        case "CLT":
            tipo = "clt";
            break;

        case "PJ":
        case "FREELANCER":
            tipo = "freelance";
            break;

        case "TRAINEE":
            tipo = "trainee";
            break;

        case "TEMPORARIO":
            tipo = "temporario";
            break;

        default:
            tipo = vaga.tipoEmprego?.toLowerCase() || "";
    }


    // ===========================================================
    // MODO DE TRABALHO
    // ===========================================================

    const modalidade =
        vaga.modoTrabalho?.toLowerCase() || "";


    // ===========================================================
    // OBJETO USADO PELO FRONTEND
    // ===========================================================

    return {

        id: vaga.idVaga,

        titulo: vaga.nome,

        empresa: vaga.nomeEmpresa,

        local: vaga.localEmpresa,

        tipo: tipo,

        modalidade: modalidade,

        area: vaga.area,


        // Ainda não existe cálculo de compatibilidade
        match: 0,


        // Ainda não existe remuneração no banco
        remuneracao: 0,

        remuneracaoTexto: "Não informado",


        publicadoHa: "Recentemente",

        diasAtras: 0,


        tags: tags,


        logoIniciais: gerarIniciais(vaga.nomeEmpresa),

        logoBg: "#E6F1FB",

        logoColor: "#0C447C"
    };
}


// ===============================================================
// GERAR INICIAIS DA EMPRESA
// ===============================================================

function gerarIniciais(nome) {

    if (!nome) {
        return "??";
    }

    return nome
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(palavra => palavra[0])
        .join("")
        .toUpperCase();
}


// ===============================================================
// ADMIN
// ===============================================================

const btnNovaVaga =
    document.getElementById("btnNovaVaga");

if (localStorage.getItem("tipoUsuario") === "ADMIN") {

    btnNovaVaga.style.display = "flex";

    btnNovaVaga.addEventListener("click", () => {

        window.location.href = "cadastrar-vaga.html";

    });
}


// ===============================================================
// ELEMENTOS DA TELA
// ===============================================================

const vagasSalvas = new Set();

const searchInput =
    document.getElementById("search-input");

const vagaList =
    document.getElementById("vaga-list");

const emptyState =
    document.getElementById("empty-state");

const resultsCount =
    document.getElementById("results-count");

const sortSelect =
    document.getElementById("sortSelect");

const matchRange =
    document.getElementById("matchRange");

const matchRangeVal =
    document.getElementById("matchRangeVal");


// ===============================================================
// LER FILTROS
// ===============================================================

function lerFiltrosAtivos() {

    const porGrupo = (grupo) => {

        return [
            ...document.querySelectorAll(
                `input[data-group="${grupo}"]:checked`
            )
        ].map(input => input.value);

    };


    return {

        busca:
            searchInput.value
                .trim()
                .toLowerCase(),

        tipos:
            porGrupo("tipo"),

        modalidades:
            porGrupo("modalidade"),

        areas:
            porGrupo("area"),

        matchMinimo:
            Number(matchRange.value),

        ordenar:
            sortSelect.value
    };
}


// ===============================================================
// VERIFICAR FILTROS
// ===============================================================

function vagaPassaNoFiltro(vaga, filtros) {

    if (
        filtros.busca &&
        !(
            vaga.titulo
                .toLowerCase()
                .includes(filtros.busca)

            ||

            vaga.empresa
                .toLowerCase()
                .includes(filtros.busca)
        )
    ) {

        return false;
    }


    if (
        filtros.tipos.length &&
        !filtros.tipos.includes(vaga.tipo)
    ) {

        return false;
    }


    if (
        filtros.modalidades.length &&
        !filtros.modalidades.includes(vaga.modalidade)
    ) {

        return false;
    }


    if (
        filtros.areas.length &&
        !filtros.areas.includes(vaga.area)
    ) {

        return false;
    }


    if (vaga.match < filtros.matchMinimo) {

        return false;
    }


    return true;
}


// ===============================================================
// ORDENAR
// ===============================================================

function ordenarVagas(lista, criterio) {

    const copia = [...lista];


    if (criterio === "match") {

        copia.sort(
            (a, b) => b.match - a.match
        );

    }


    else if (criterio === "salario") {

        copia.sort(
            (a, b) => b.remuneracao - a.remuneracao
        );

    }


    else {

        copia.sort(
            (a, b) => a.diasAtras - b.diasAtras
        );

    }


    return copia;
}


// ===============================================================
// HTML DO CARD
// ===============================================================

function vagaCardHtml(v) {

    const matchClass =
        v.match >= 85
            ? "match-high"
            : "match-med";


    const savedClass =
        vagasSalvas.has(v.id)
            ? " saved"
            : "";


    const tagsHtml =
        v.tags
            .map(tag =>
                `<span class="vtag ${tag.tipo}">
                    ${tag.label}
                </span>`
            )
            .join("");


    return `

      <a
        href="vaga-detalhe.html?id=${v.id}"
        class="vaga"
        data-vaga-id="${v.id}"
      >

        <div
            class="vaga-logo"
            style="
                background:${v.logoBg};
                color:${v.logoColor}
            "
        >
            ${v.logoIniciais}
        </div>


        <div class="vaga-body">

            <div class="vaga-top">

                <div>

                    <div class="vaga-title">
                        ${v.titulo}
                    </div>

                    <div class="vaga-company">
                        ${v.empresa} · ${v.local}
                    </div>

                </div>


                <div class="match-badge ${matchClass}">

                    <i
                        class="ti ti-bolt"
                        style="
                            font-size:11px
                        "
                    ></i>

                    ${v.match}% match

                </div>

            </div>


            <div class="vaga-tags">

                ${tagsHtml}

            </div>


            <div class="vaga-footer">

                <span class="vaga-meta">

                    <i class="ti ti-coin"></i>

                    ${v.remuneracaoTexto}

                </span>


                <span class="vaga-meta">

                    <i class="ti ti-clock"></i>

                    ${v.publicadoHa}

                </span>


                <button
                    class="save-btn${savedClass}"
                    onclick="
                        return alternarSalvar(
                            event,
                            this,
                            '${v.id}'
                        )
                    "
                    aria-label="Salvar"
                >

                    <i class="ti ti-heart"></i>

                </button>

            </div>

        </div>

      </a>

    `;
}


// ===============================================================
// SALVAR VAGA
// ===============================================================

function alternarSalvar(event, btn, vagaId) {

    event.preventDefault();


    if (vagasSalvas.has(vagaId)) {

        vagasSalvas.delete(vagaId);

        btn.classList.remove("saved");

    }

    else {

        vagasSalvas.add(vagaId);

        btn.classList.add("saved");

    }


    return false;
}


window.alternarSalvar = alternarSalvar;


// ===============================================================
// APLICAR FILTROS
// ===============================================================

function aplicarFiltros() {

    const filtros =
        lerFiltrosAtivos();


    const filtradas =
        ordenarVagas(

            TODAS_VAGAS.filter(
                vaga =>
                    vagaPassaNoFiltro(
                        vaga,
                        filtros
                    )
            ),

            filtros.ordenar
        );


    resultsCount.textContent =
        filtradas.length;


    if (filtradas.length === 0) {

        vagaList.innerHTML = "";

        emptyState.classList.add("show");

        return;
    }


    emptyState.classList.remove("show");


    vagaList.innerHTML =
        filtradas
            .map(vaga => vagaCardHtml(vaga))
            .join("");
}


// ===============================================================
// BUSCA
// ===============================================================

let debounceTimer;


searchInput.addEventListener("input", () => {

    clearTimeout(debounceTimer);


    debounceTimer = setTimeout(
        aplicarFiltros,
        250
    );

});


// ===============================================================
// CHECKBOXES
// ===============================================================

document
    .querySelectorAll('input[data-group]')
    .forEach(input => {

        input.addEventListener(
            "change",
            aplicarFiltros
        );

    });


// ===============================================================
// ORDENAÇÃO
// ===============================================================

sortSelect.addEventListener(
    "change",
    aplicarFiltros
);


// ===============================================================
// COMPATIBILIDADE
// ===============================================================

matchRange.addEventListener(
    "input",
    () => {

        matchRangeVal.textContent =
            matchRange.value + "%";

        aplicarFiltros();

    }
);


// ===============================================================
// LIMPAR FILTROS
// ===============================================================

function limparFiltros() {

    searchInput.value = "";


    document
        .querySelectorAll('input[data-group]')
        .forEach(input => {

            input.checked = false;

        });


    matchRange.value = 0;

    matchRangeVal.textContent = "0%";

    sortSelect.value = "recentes";


    aplicarFiltros();
}


document
    .getElementById("btnLimpar")
    .addEventListener(
        "click",
        limparFiltros
    );


document
    .getElementById("btnLimparVazio")
    .addEventListener(
        "click",
        limparFiltros
    );


// ===============================================================
// INICIAR
// ===============================================================

carregarVagas();

