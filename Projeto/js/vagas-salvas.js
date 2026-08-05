const API_URL = "http://localhost:8080";

const vagaList = document.getElementById("vaga-list");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");

let vagasSalvas = [];

// ---------------------------------------------------------------
// Renderização
// ---------------------------------------------------------------
function vagaCardHtml(v) {
    const matchClass = v.match >= 85 ? "match-high" : "match-med";
    const tagsHtml = (v.tags || []).map(t => `<span class="vtag ${t.tipo}">${t.label}</span>`).join("");

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
            <span class="vaga-meta"><i class="ti ti-coin"></i> ${v.remuneracaoTexto || ""}</span>
            <span class="vaga-meta"><i class="ti ti-clock"></i> ${v.publicadoHa || ""}</span>
            <button class="save-btn saved" onclick="return removerSalva(event, this, '${v.id}')" aria-label="Remover dos salvos"><i class="ti ti-heart"></i></button>
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
// Remover uma vaga dos salvos (chama a mesma rota usada em vagas.js)
// ---------------------------------------------------------------
async function removerSalva(event, btn, vagaId) {
    event.preventDefault();

    try {
        // fetchComAuth (definido em auth-fetch.js) revalida o token
        // automaticamente se a API responder 401
        const resposta = await fetchComAuth(`${API_URL}/vagas/${vagaId}/salvar`, { method: "DELETE" });
        if (!resposta.ok) throw new Error("Falha ao remover vaga salva");

        vagasSalvas = vagasSalvas.filter(v => v.id !== vagaId);
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
// Espera que a API retorne um array de objetos de vaga (mesmo
// formato usado em vagas.js: id, titulo, empresa, local, match,
// remuneracaoTexto, publicadoHa, tags, logoIniciais, logoBg, logoColor)
// ---------------------------------------------------------------
async function carregarVagasSalvas() {
    try {
        const resposta = await fetchComAuth(`${API_URL}/vagas/salvas`);
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
