const API_URL = "https://projeto-uepb-connect-production.up.railway.app";

const vagaList = document.getElementById("vaga-list");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");

let vagasSalvas = [];

// ---------------------------------------------------------------
// GERA INICIAIS DA EMPRESA
// ---------------------------------------------------------------
function gerarIniciais(nome) {

    if (!nome) {
        return "V";
    }

    const palavras = String(nome).trim().split(/\s+/);

    if (palavras.length === 1) {
        return palavras[0].substring(0, 2).toUpperCase();
    }

    return (
        palavras[0][0] +
        palavras[palavras.length - 1][0]
    ).toUpperCase();
}

// ---------------------------------------------------------------
// FORMATA TIPO DE EMPREGO
// ---------------------------------------------------------------
function formatarTipoEmprego(tipo) {

    if (!tipo) {
        return "Não informado";
    }

    const tipos = {
        ESTAGIO: "Estágio",
        CLT: "CLT",
        PJ: "Freelance / PJ",
        TEMPORARIO: "Temporário",
        APRENDIZ: "Aprendiz"
    };

    return tipos[tipo] || tipo;
}

// ---------------------------------------------------------------
// FORMATA MODALIDADE
// ---------------------------------------------------------------
function formatarModalidade(modalidade) {

    if (!modalidade) {
        return "Não informado";
    }

    const modalidades = {
        PRESENCIAL: "Presencial",
        REMOTO: "Remoto",
        HIBRIDO: "Híbrido"
    };

    return modalidades[modalidade] || modalidade;
}

// ---------------------------------------------------------------
// CRIA TAGS DE LINGUAGENS/FRAMEWORKS
//
// Os campos vêm da API como string separada por vírgula
// (ex: "Java, JavaScript"), então precisam ser divididos
// em tags individuais.
// ---------------------------------------------------------------
function criarTagsTecnologia(v) {

    const linguagens = v.linguagens
        ? v.linguagens.split(",").map(s => s.trim()).filter(Boolean)
        : [];

    const frameworks = v.frameworks
        ? v.frameworks.split(",").map(s => s.trim()).filter(Boolean)
        : [];

    return [...linguagens, ...frameworks]
        .map(tech => `<span class="vtag tech">${tech}</span>`)
        .join("");
}

// ---------------------------------------------------------------
// Renderização
//
// Usa os campos reais do VagasResponseDto (idVaga, nome,
// nomeEmpresa, localEmpresa, area, tipoEmprego, modoTrabalho,
// Remuneracao, linguagens, frameworks), sem badge de match —
// essa informação não existe nesse DTO.
// ---------------------------------------------------------------
function vagaCardHtml(v) {

    const iniciais = gerarIniciais(v.nomeEmpresa);
    const tagsTecnologia = criarTagsTecnologia(v);

    return `
      <a href="vaga-detalhe.html?id=${v.idVaga}" class="vaga" data-vaga-id="${v.idVaga}">
        <div class="vaga-logo">${iniciais}</div>
        <div class="vaga-body">
          <div class="vaga-top">
            <div>
              <div class="vaga-title">${v.nome || "Vaga sem título"}</div>
              <div class="vaga-company">${v.nomeEmpresa || "Empresa não informada"} · ${v.localEmpresa || "Local não informado"}</div>
            </div>
          </div>
          <div class="vaga-tags">
            <span class="vtag area">${v.area || "Área não informada"}</span>
            <span class="vtag tipo">${formatarTipoEmprego(v.tipoEmprego)}</span>
            ${tagsTecnologia}
          </div>
          <div class="vaga-footer">
            <span class="vaga-meta"><i class="ti ti-coin"></i> ${v.Remuneracao || "Não informado"}</span>
            <span class="vaga-meta"><i class="ti ti-map-pin"></i> ${formatarModalidade(v.modoTrabalho)}</span>
            <button class="save-btn saved" onclick="return removerSalva(event, this, '${v.idVaga}')" aria-label="Remover dos salvos"><i class="ti ti-heart"></i></button>
          </div>
        </div>
      </a>`;
}

function renderizar() {
    resultsCount.textContent = vagasSalvas.length;

    if (vagasSalvas.length === 0) {
        vagaList.innerHTML = "";
        emptyState.classList.add("show");
        return;
    }
    emptyState.classList.remove("show");
    vagaList.innerHTML = vagasSalvas.map(vagaCardHtml).join("");
}

// ---------------------------------------------------------------
// Remover uma vaga dos salvos
//
// POST /vagas-salvas/{idVaga} alterna o estado no backend.
// Como a vaga já está salva nessa tela, o toggle sempre remove.
// ---------------------------------------------------------------
async function removerSalva(event, btn, vagaId) {
    event.preventDefault();

    try {
        const resposta = await fetchComAuth(`${API_URL}/vagas-salvas/${vagaId}`, { method: "POST" });
        if (!resposta.ok) throw new Error("Falha ao remover vaga salva");

        vagasSalvas = vagasSalvas.filter(v => String(v.idVaga) !== String(vagaId));
        renderizar();

    } catch (erro) {
        console.error("Erro ao remover vaga salva:", erro);
        alert("Não foi possível remover a vaga dos salvos. Tente novamente.");
    }

    return false;
}
window.removerSalva = removerSalva;

// ---------------------------------------------------------------
// Carrega as vagas salvas do usuário
//
// Rota corrigida: GET /vagas-salvas/detalhes, que devolve a
// lista de VagasResponseDto (vagas completas), não só os IDs.
// ---------------------------------------------------------------
async function carregarVagasSalvas() {
    try {
        const resposta = await fetchComAuth(`${API_URL}/vagas-salvas/detalhes`);
        if (!resposta.ok) {
            renderizar();
            return;
        }
        vagasSalvas = await resposta.json();
        renderizar();

    } catch (erro) {
        console.error("Erro ao carregar vagas salvas:", erro);
        renderizar();
    }
}

carregarVagasSalvas();