
const API_URL = "http://localhost:8080";

// ===============================================================
// ELEMENTOS
// ===============================================================

const vagaTitulo = document.getElementById("vagaTitulo");
const vagaTituloBreadcrumb = document.getElementById("vagaTituloBreadcrumb");
const vagaEmpresa = document.getElementById("vagaEmpresa");
const vagaLogo = document.getElementById("vagaLogo");

const vagaArea = document.getElementById("vagaArea");
const vagaLinguagens = document.getElementById("vagaLinguagens");
const vagaFrameworks = document.getElementById("vagaFrameworks");
const vagaTipo = document.getElementById("vagaTipo");
const vagaModalidade = document.getElementById("vagaModalidade");

const vagaSobre = document.getElementById("vagaSobre");
const vagaRequisitos = document.getElementById("vagaRequisitos");
const vagaDetalhes = document.getElementById("vagaDetalhes");


// ===============================================================
// PEGA ID DA URL
// ===============================================================

const params = new URLSearchParams(window.location.search);
const idVaga = params.get("id");

console.log("ID da vaga:", idVaga);


// ===============================================================
// FETCH AUTENTICADO
// ===============================================================

async function fetchComAuth(url, options = {}) {

    const config = {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    };

    return fetch(url, config);
}


// ===============================================================
// VERIFICA ID
// ===============================================================

if (!idVaga) {

    console.error("Nenhum ID de vaga foi informado.");

    if (vagaTitulo) {
        vagaTitulo.textContent = "Vaga não encontrada";
    }

} else {

    carregarVaga(idVaga);
}


// ===============================================================
// NORMALIZA TEXTO
// ===============================================================

function normalizarTexto(texto) {

    if (!texto) {
        return "";
    }

    return String(texto)
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ===============================================================
// FORMATA TIPO
// ===============================================================

function formatarTipoEmprego(tipo) {

    const valor = normalizarTexto(tipo);

    switch (valor) {

        case "estagio":
            return "Estágio";

        case "clt":
            return "CLT";

        case "pj":
            return "Freelance / PJ";

        case "temporario":
            return "Temporário";

        case "aprendiz":
            return "Aprendiz";

        default:
            return tipo || "Não informado";
    }
}


// ===============================================================
// FORMATA MODALIDADE
// ===============================================================

function formatarModalidade(modalidade) {

    const valor = normalizarTexto(modalidade);

    switch (valor) {

        case "presencial":
            return "Presencial";

        case "remoto":
            return "Remoto";

        case "hibrido":
            return "Híbrido";

        default:
            return modalidade || "Não informado";
    }
}


// ===============================================================
// GERA INICIAIS
// ===============================================================

function gerarIniciais(nome) {

    if (!nome) {
        return "V";
    }

    const palavras = nome.trim().split(/\s+/);

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
// CARREGA VAGA
// ===============================================================

async function carregarVaga(id) {

    try {

        console.log(`Buscando vaga ${id}...`);

        const resposta = await fetchComAuth(
            `${API_URL}/vagas/${encodeURIComponent(id)}`,
            {
                method: "GET"
            }
        );

        console.log("Status:", resposta.status);

        if (!resposta.ok) {

            if (resposta.status === 401) {
                throw new Error(
                    "Usuário não autenticado. Faça login novamente."
                );
            }

            if (resposta.status === 403) {
                throw new Error(
                    "Acesso negado. O backend não autorizou o acesso à vaga."
                );
            }

            if (resposta.status === 404) {
                throw new Error(
                    "Vaga não encontrada."
                );
            }

            throw new Error(
                `Erro ao buscar vaga: ${resposta.status}`
            );
        }

        const vaga = await resposta.json();

        console.log("Vaga recebida:", vaga);

        preencherPagina(vaga);

    } catch (erro) {

        console.error("Erro ao carregar vaga:", erro);

        if (vagaTitulo) {
            vagaTitulo.textContent = "Erro ao carregar vaga";
        }

        if (vagaTituloBreadcrumb) {
            vagaTituloBreadcrumb.textContent = "Erro";
        }
    }
}


// ===============================================================
// PREENCHER PÁGINA
// ===============================================================

function preencherPagina(vaga) {

    // -----------------------------------------------------------
    // CABEÇALHO
    // -----------------------------------------------------------

    if (vagaTitulo) {

        vagaTitulo.textContent =
            vaga.nome || "Vaga sem título";
    }

    if (vagaTituloBreadcrumb) {

        vagaTituloBreadcrumb.textContent =
            vaga.nome || "Vaga";
    }

    if (vagaEmpresa) {

        vagaEmpresa.textContent =
            `${vaga.nomeEmpresa || "Empresa não informada"} · ${
                vaga.localEmpresa || "Local não informado"
            }`;
    }

    if (vagaLogo) {

        vagaLogo.textContent =
            gerarIniciais(vaga.nomeEmpresa);
    }


    // -----------------------------------------------------------
    // TAGS
    // -----------------------------------------------------------

    if (vagaArea) {

        vagaArea.textContent =
            vaga.area || "Área não informada";
    }

    if (vagaLinguagens) {

        vagaLinguagens.textContent =
            vaga.linguagens || "Não informado";
    }

    if (vagaFrameworks) {

        vagaFrameworks.textContent =
            vaga.frameworks || "Não informado";
    }

    if (vagaTipo) {

        vagaTipo.textContent =
            formatarTipoEmprego(vaga.tipoEmprego);
    }

    if (vagaModalidade) {

        vagaModalidade.textContent =
            formatarModalidade(vaga.modoTrabalho);
    }


    // -----------------------------------------------------------
    // DESCRIÇÕES
    // -----------------------------------------------------------

    if (vagaSobre) {

        vagaSobre.textContent =
            vaga.sobreVaga || "Não informado";
    }

    if (vagaRequisitos) {

        vagaRequisitos.textContent =
            vaga.requisitos || "Não informado";
    }

    if (vagaDetalhes) {

        vagaDetalhes.textContent =
            vaga.detalhes || "Não informado";
    }
}
