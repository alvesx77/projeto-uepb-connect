// ===============================================================
// CONFIGURAÇÃO
// ===============================================================

const API_URL = "http://localhost:8080";
const API_URL_USUARIO = "http://localhost:8080/retornarDadosDashboard";

let TODAS_VAGAS = [];

const vagasSalvas = new Set();


// ===============================================================
// ELEMENTOS DO HTML
// ===============================================================

const btnNovaVaga = document.getElementById("btnNovaVaga");

const searchInput = document.getElementById("search-input");
const vagaList = document.getElementById("vaga-list");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const sortSelect = document.getElementById("sortSelect");
const matchRange = document.getElementById("matchRange");
const matchRangeVal = document.getElementById("matchRangeVal");


// ===============================================================
// USUÁRIO (tipo, pra mostrar botão de admin)
// ===============================================================

const tipoUsuario = localStorage.getItem("tipoUsuario");

if (tipoUsuario === "ADMIN" && btnNovaVaga) {

    btnNovaVaga.style.display = "flex";

    btnNovaVaga.addEventListener("click", () => {
        window.location.href = "cadastrar-vaga.html";
    });
}


// ===============================================================
// CARREGAR DADOS REAIS DO USUÁRIO NA SIDEBAR
//
// Antes o nome/curso/período na sidebar (nav-avatar) ficavam
// fixos como "Maria Silva" / "CC · 5º período". Agora busca do
// mesmo endpoint usado no dashboard e preenche os elementos
// pelos IDs navAvCircle / navAvNome / navAvInfo.
// ===============================================================

async function carregarUsuarioSidebar() {

    try {

        const resposta = await fetchComAuth(API_URL_USUARIO, {
            method: "GET"
        });

        if (!resposta.ok) {
            return;
        }

        const usuario = await resposta.json();

        const iniciais = usuario.nomeCompleto
            .split(" ")
            .map(nome => nome[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        const navAvCircle = document.getElementById("navAvCircle");

        if (navAvCircle) {
            navAvCircle.textContent = iniciais;
        }

        const navAvNome = document.getElementById("navAvNome");

        if (navAvNome) {
            const partesNome = usuario.nomeCompleto.split(" ");
            navAvNome.textContent = partesNome.slice(0, 2).join(" ");
        }

        const navAvInfo = document.getElementById("navAvInfo");

        if (navAvInfo) {
            navAvInfo.textContent = `${usuario.curso} · ${usuario.periodo}`;
        }

    } catch (error) {
        console.warn("Erro ao carregar dados do usuário na sidebar:", error);
    }
}


// ===============================================================
// NORMALIZA TEXTO
// ===============================================================

function normalizarTexto(texto) {

    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}


// ===============================================================
// NORMALIZA TIPO
//
// IMPORTANTE:
//
// HTML:
// freelance
//
// API:
// PJ
//
// Ambos serão tratados como:
// pj
// ===============================================================

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


// ===============================================================
// NORMALIZA MODALIDADE
// ===============================================================

function normalizarModalidade(modalidade) {

    return normalizarTexto(modalidade);
}


// ===============================================================
// NORMALIZA ÁREA
// ===============================================================

function normalizarArea(area) {

    return normalizarTexto(area);
}


// ===============================================================
// GERA INICIAIS DA EMPRESA
// ===============================================================

function gerarIniciais(nome) {

    if (!nome) {
        return "V";
    }

    const palavras = String(nome)
        .trim()
        .split(/\s+/);

    if (palavras.length === 1) {

        return palavras[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        palavras[0][0] +
        palavras[palavras.length - 1][0]
    ).toUpperCase();
}


// ===============================================================
// FORMATA TIPO DE EMPREGO
// ===============================================================

function formatarTipoEmprego(tipo) {

    const tipoNormalizado = normalizarTipo(tipo);

    const tipos = {

        estagio: "Estágio",

        clt: "CLT",

        pj: "Freelance / PJ",

        temporario: "Temporário",

        aprendiz: "Aprendiz"
    };

    return (
        tipos[tipoNormalizado] ||
        tipo ||
        "Não informado"
    );
}


// ===============================================================
// FORMATA MODALIDADE
// ===============================================================

function formatarModalidade(modalidade) {

    const modalidadeNormalizada =
        normalizarModalidade(modalidade);

    const modalidades = {

        presencial: "Presencial",

        remoto: "Remoto",

        hibrido: "Híbrido"
    };

    return (
        modalidades[modalidadeNormalizada] ||
        modalidade ||
        "Não informado"
    );
}


// ===============================================================
// CRIA TAGS
// ===============================================================

function criarTags(vaga) {

    const tags = [];

    if (vaga.tipoEmprego) {

        tags.push({
            tipo: "tipo",
            label: formatarTipoEmprego(vaga.tipoEmprego)
        });
    }

    if (vaga.modoTrabalho) {

        tags.push({
            tipo: "modalidade",
            label: formatarModalidade(vaga.modoTrabalho)
        });
    }

    if (vaga.area) {

        tags.push({
            tipo: "area",
            label: vaga.area
        });
    }

    return tags;
}


// ===============================================================
// CONVERTE VAGA DA API
// ===============================================================

function converterVaga(vaga, index) {

    return {

        id: vaga.idVaga,

        titulo:
            vaga.nome ||
            "Vaga sem título",

        empresa:
            vaga.nomeEmpresa ||
            "Empresa não informada",

        local:
            vaga.localEmpresa ||
            "Local não informado",

        tipo:
            normalizarTipo(
                vaga.tipoEmprego
            ),

        modalidade:
            normalizarModalidade(
                vaga.modoTrabalho
            ),

        area:
            normalizarArea(
                vaga.area
            ),

        match:
            Number(vaga.match ?? 0),

        remuneracao:
            Number(vaga.remuneracao ?? 0),

        remuneracaoTexto:
            vaga.remuneracaoTexto ||
            "A combinar",

        publicadoHa:
            vaga.publicadoHa ||
            "Recentemente",

        diasAtras:
            Number(
                vaga.diasAtras ?? index
            ),

        logoIniciais:
            vaga.logoIniciais ||
            gerarIniciais(
                vaga.nomeEmpresa
            ),

        logoBg:
            vaga.logoBg ||
            "#eeeeee",

        logoColor:
            vaga.logoColor ||
            "#333333",

        tags:
            vaga.tags ||
            criarTags(vaga),

        detalhes:
            vaga.detalhes || "",

        frameworks:
            vaga.frameworks || "",

        linguagens:
            vaga.linguagens || "",

        requisitos:
            vaga.requisitos || "",

        sobreVaga:
            vaga.sobreVaga || "",

        idEmpresa:
            vaga.idEmpresa
    };
}


// ===============================================================
// LÊ FILTROS ATIVOS
// ===============================================================

function lerFiltrosAtivos() {

    const tiposSelecionados = [
        ...document.querySelectorAll(
            'input[data-group="tipo"]:checked'
        )
    ].map(input => normalizarTipo(input.value));


    const modalidadesSelecionadas = [
        ...document.querySelectorAll(
            'input[data-group="modalidade"]:checked'
        )
    ].map(input => normalizarModalidade(input.value));


    const areasSelecionadas = [
        ...document.querySelectorAll(
            'input[data-group="area"]:checked'
        )
    ].map(input => normalizarArea(input.value));


    return {

        busca:
            normalizarTexto(
                searchInput?.value || ""
            ),

        tipos:
            tiposSelecionados,

        modalidades:
            modalidadesSelecionadas,

        areas:
            areasSelecionadas,

        matchMinimo:
            Number(
                matchRange?.value || 0
            ),

        ordenar:
            sortSelect?.value ||
            "recentes"
    };
}


// ===============================================================
// VERIFICA SE A VAGA PASSA NOS FILTROS
// ===============================================================

function vagaPassaNoFiltro(vaga, filtros) {

    const titulo =
        normalizarTexto(vaga.titulo);

    const empresa =
        normalizarTexto(vaga.empresa);

    const area =
        normalizarArea(vaga.area);


    if (
        filtros.busca &&
        !titulo.includes(filtros.busca) &&
        !empresa.includes(filtros.busca) &&
        !area.includes(filtros.busca)
    ) {

        return false;
    }


    const tipoVaga =
        normalizarTipo(vaga.tipo);


    if (
        filtros.tipos.length &&
        !filtros.tipos.includes(tipoVaga)
    ) {

        return false;
    }


    const modalidadeVaga =
        normalizarModalidade(vaga.modalidade);


    if (
        filtros.modalidades.length &&
        !filtros.modalidades.includes(
            modalidadeVaga
        )
    ) {

        return false;
    }


    const areaVaga =
        normalizarArea(vaga.area);


    if (
        filtros.areas.length &&
        !filtros.areas.includes(areaVaga)
    ) {

        return false;
    }


    if (
        Number(vaga.match) <
        Number(filtros.matchMinimo)
    ) {

        return false;
    }


    return true;
}


// ===============================================================
// ORDENA VAGAS
// ===============================================================

function ordenarVagas(lista, criterio) {

    const copia = [...lista];

    if (criterio === "match") {

        copia.sort(
            (a, b) =>
                Number(b.match) -
                Number(a.match)
        );

    }

    else if (criterio === "salario") {

        copia.sort(
            (a, b) =>
                Number(b.remuneracao) -
                Number(a.remuneracao)
        );

    }

    else {

        copia.sort(
            (a, b) =>
                Number(a.diasAtras) -
                Number(b.diasAtras)
        );
    }

    return copia;
}


// ===============================================================
// RENDERIZA CARD
// ===============================================================

function vagaCardHtml(v) {

    const matchClass =
        v.match >= 85
            ? "match-high"
            : "match-med";

    const savedClass =
        vagasSalvas.has(String(v.id))
            ? " saved"
            : "";

    const tagsHtml =
        (v.tags || [])
            .map(tag => `
                <span class="vtag ${tag.tipo}">
                    ${tag.label}
                </span>
            `)
            .join("");


    return `

        <a
            href="vaga-detalhe.html?id=${encodeURIComponent(v.id)}"
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
                            style="font-size:11px"
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
// APLICA FILTROS
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


    if (resultsCount) {

        resultsCount.textContent =
            filtradas.length;
    }


    if (filtradas.length === 0) {

        if (vagaList) {
            vagaList.innerHTML = "";
        }

        if (emptyState) {
            emptyState.classList.add("show");
        }

        return;
    }


    if (emptyState) {
        emptyState.classList.remove("show");
    }


    if (vagaList) {

        vagaList.innerHTML =
            filtradas
                .map(vagaCardHtml)
                .join("");
    }
}


// ===============================================================
// CARREGA VAGAS DA API
//
// ATENÇÃO: esta função busca a LISTA COMPLETA de vagas
// (usada pelos filtros de vagas.html), não as vagas salvas.
//
// A URL abaixo ainda está como "/vagas/salvas", que é a mesma
// usada por engano em carregarVagasSalvas(). Confirme qual é
// o endpoint real de listagem geral de vagas no seu backend
// (ex: GET /vagas, GET /vagas/todas, etc) e ajuste aqui.
// ===============================================================

async function carregarVagas() {

    try {

        console.log("Buscando vagas na API...");


        const resposta =
            await fetchComAuth(
                `${API_URL}/vagas/salvas`, // <-- CONFIRME ESTA ROTA
                {
                    method: "GET"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                `Erro ao buscar vagas: ${resposta.status}`
            );
        }


        const dados =
            await resposta.json();


        console.log(
            "Vagas recebidas da API:",
            dados
        );


        if (!Array.isArray(dados)) {

            throw new Error(
                "A API não retornou uma lista."
            );
        }


        TODAS_VAGAS =
            dados.map(
                (vaga, index) =>
                    converterVaga(
                        vaga,
                        index
                    )
            );


        aplicarFiltros();


    } catch (erro) {

        console.error(
            "Erro ao carregar vagas:",
            erro
        );


        TODAS_VAGAS = [];


        if (resultsCount) {
            resultsCount.textContent = "0";
        }


        if (vagaList) {
            vagaList.innerHTML = "";
        }


        if (emptyState) {
            emptyState.classList.add("show");
        }
    }
}


// ===============================================================
// CARREGA VAGAS SALVAS
// ===============================================================

async function carregarVagasSalvas() {

    try {

        const resposta =
            await fetchComAuth(
                `${API_URL}/vagas-salvas`
            );


        if (!resposta.ok) {

            console.warn(
                "Não foi possível carregar vagas salvas."
            );

            return;
        }


        const idsSalvos =
            await resposta.json();


        if (Array.isArray(idsSalvos)) {

            idsSalvos.forEach(id => {

                vagasSalvas.add(
                    String(id)
                );

            });
        }


        aplicarFiltros();


    } catch (erro) {

        console.warn(
            "Erro ao carregar vagas salvas:",
            erro
        );
    }
}


// ===============================================================
// SALVAR / REMOVER VAGA
// ===============================================================

async function alternarSalvar(
    event,
    btn,
    vagaId
) {

    event.preventDefault();
    event.stopPropagation();


    const id =
        String(vagaId);


    const estavaSalva =
        vagasSalvas.has(id);


    if (estavaSalva) {

        vagasSalvas.delete(id);

        btn.classList.remove("saved");

    } else {

        vagasSalvas.add(id);

        btn.classList.add("saved");
    }


    try {

        const resposta =
            await fetchComAuth(

                `${API_URL}/vagas-salvas/${encodeURIComponent(id)}`,

                {
                    method: "POST"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                `Falha ao salvar vaga: ${resposta.status}`
            );
        }


        const dados =
            await resposta.json();


        if (dados.salva) {
            vagasSalvas.add(id);
            btn.classList.add("saved");
        } else {
            vagasSalvas.delete(id);
            btn.classList.remove("saved");
        }


    } catch (erro) {

        console.error(
            "Erro ao salvar vaga:",
            erro
        );


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


window.alternarSalvar =
    alternarSalvar;


// ===============================================================
// PESQUISA
// ===============================================================

let debounceTimer;


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                debounceTimer
            );


            debounceTimer =
                setTimeout(
                    aplicarFiltros,
                    250
                );

        }
    );
}


// ===============================================================
// CHECKBOXES
// ===============================================================

document
    .querySelectorAll(
        "input[data-group]"
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            aplicarFiltros
        );

    });


// ===============================================================
// ORDENAÇÃO
// ===============================================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        aplicarFiltros
    );
}


// ===============================================================
// RANGE DE MATCH
// ===============================================================

if (matchRange) {

    matchRange.addEventListener(
        "input",
        () => {

            if (matchRangeVal) {

                matchRangeVal.textContent =
                    matchRange.value + "%";
            }


            aplicarFiltros();

        }
    );
}


// ===============================================================
// LIMPAR FILTROS
// ===============================================================

function limparFiltros() {

    if (searchInput) {
        searchInput.value = "";
    }


    document
        .querySelectorAll(
            "input[data-group]"
        )
        .forEach(input => {

            input.checked = false;

        });


    if (matchRange) {
        matchRange.value = 0;
    }


    if (matchRangeVal) {
        matchRangeVal.textContent = "0%";
    }


    if (sortSelect) {
        sortSelect.value = "recentes";
    }


    aplicarFiltros();
}


// ===============================================================
// BOTÕES DE LIMPAR
// ===============================================================

const btnLimpar =
    document.getElementById("btnLimpar");


if (btnLimpar) {

    btnLimpar.addEventListener(
        "click",
        limparFiltros
    );
}


const btnLimparVazio =
    document.getElementById("btnLimparVazio");


if (btnLimparVazio) {

    btnLimparVazio.addEventListener(
        "click",
        limparFiltros
    );
}


// ===============================================================
// INICIALIZAÇÃO
// ===============================================================

carregarUsuarioSidebar();
carregarVagas();
carregarVagasSalvas();