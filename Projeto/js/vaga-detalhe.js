const API_URL = "http://localhost:8080";
const API_URL_USUARIO = "http://localhost:8080/retornarDadosDashboard";

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

const vagaRemuneracao = document.getElementById("vagaRemuneracao");
const vagaCargaHoraria = document.getElementById("vagaCargaHoraria");
const vagaModalidadeTabela = document.getElementById("vagaModalidadeTabela");
const vagaDuracao = document.getElementById("vagaDuracao");
const vagaBeneficios = document.getElementById("vagaBeneficios");
const vagaInicioPrevisto = document.getElementById("vagaInicioPrevisto");

const vagaSobre = document.getElementById("vagaSobre");
const vagaRequisitos = document.getElementById("vagaRequisitos");
const vagaDetalhes = document.getElementById("vagaDetalhes");

const listaVagasSimilares = document.getElementById("listaVagasSimilares");


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
// CARREGAR DADOS REAIS DO USUÁRIO NA SIDEBAR
//
// Antes o nome/curso/período na sidebar (nav-avatar) ficavam
// fixos como "Maria Silva" / "CC · 5º período". Agora busca do
// mesmo endpoint usado no dashboard e preenche pelos IDs
// navAvCircle / navAvNome / navAvInfo.
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


async function carregarVagasSimilares(area) {

    try {

        const resposta = await fetchComAuth(
            `${API_URL}/paginas/adicionarVagas/${area}`,
            {
                method:"GET"
            }
        );


        if(!resposta.ok){
            throw new Error(
                "Erro ao buscar vagas similares"
            );
        }


        const dados = await resposta.json();


        console.log(
            "Vagas similares:",
            dados
        );


        renderizarVagasSimilares(
            dados.content
        );


    } catch(error){

        console.error(
            error
        );

    }

}

async function candidatarVaga() {

    const params = new URLSearchParams(window.location.search);
    const idVaga = params.get("id");

    try {

        const resposta = await fetchComAuth(
            `${API_URL}/candidaturas/${idVaga}`,
            { method: "POST" }
        );

        if (resposta.status === 201) {
            showToast("Candidatura enviada com sucesso!");
            return;
        }

        if (resposta.status === 409) {
            showToast("Você já se candidatou a essa vaga.");
            return;
        }

        if (resposta.status === 404) {
            showToast("Vaga não encontrada.");
            return;
        }

        throw new Error("Erro ao candidatar");

    } catch (error) {
        console.error(error);
        showToast("Erro ao enviar candidatura. Tente novamente.");
    }

}


function renderizarVagasSimilares(vagas){

    listaVagasSimilares.innerHTML = "";


    vagas.forEach(vaga => {


        const iniciais =
            gerarIniciais(vaga.nomeEmpresa);



        listaVagasSimilares.innerHTML += `

        <a href="vaga-detalhe.html?id=${vaga.idVaga}" 
           class="sim-item">


            <div class="sim-logo">

                ${iniciais}

            </div>


            <div class="sim-text">

                <p>
                    ${vaga.nome}
                </p>


                <span>

                    ${vaga.nomeEmpresa}
                    ·
                    ${formatarModalidade(vaga.modoTrabalho)}

                </span>


            </div>


            <div class="sim-pct">

                90%

            </div>


        </a>

        `;


    });

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

async function toggleSave() {

    const params = new URLSearchParams(window.location.search);
    const idVaga = params.get("id");

    const saveBtn = document.getElementById("saveBtn");
    const saveText = document.getElementById("saveText");

    if (!saveBtn) {
        return;
    }

    try {

        const resposta = await fetchComAuth(
            `${API_URL}/vagas-salvas/${idVaga}`,
            { method: "POST" }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao salvar vaga");
        }

        const dados = await resposta.json();

        saveBtn.classList.toggle("saved", dados.salva);

        if (saveText) {
            saveText.textContent = dados.salva ? "Vaga salva" : "Salvar vaga";
        }

        showToast(dados.salva ? "Vaga salva!" : "Vaga removida dos salvos.");

    } catch (error) {
        console.error(error);
        showToast("Erro ao salvar vaga. Tente novamente.");
    }

}

async function verificarSeSalva(idVaga) {

    const saveBtn = document.getElementById("saveBtn");
    const saveText = document.getElementById("saveText");

    if (!saveBtn) {
        return;
    }

    try {

        const resposta = await fetchComAuth(
            `${API_URL}/vagas-salvas/${idVaga}`,
            { method: "GET" }
        );

        if (!resposta.ok) {
            return;
        }

        const dados = await resposta.json();

        saveBtn.classList.toggle("saved", dados.salva);

        if (saveText) {
            saveText.textContent = dados.salva ? "Vaga salva" : "Salvar vaga";
        }

    } catch (error) {
        console.error("Erro ao verificar salvamento:", error);
    }

}

// ===============================================================
// TOAST
// ===============================================================

function showToast(mensagem) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = mensagem;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
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
            `${vaga.nomeEmpresa || "Empresa não informada"} · ${vaga.localEmpresa || "Local não informado"
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


    // -----------------------------------------------------------
    // DETALHES DA VAGA
    // -----------------------------------------------------------

    if (vagaRemuneracao) {
        vagaRemuneracao.textContent =
            vaga.remuneracao || "Não informado";
    }

    if (vagaCargaHoraria) {
        vagaCargaHoraria.textContent =
            vaga.cargaHoraria || "Não informado";
    }

    if (vagaModalidadeTabela) {
        vagaModalidadeTabela.textContent =
            formatarModalidade(vaga.modoTrabalho);
    }

    if (vagaDuracao) {
        vagaDuracao.textContent =
            vaga.duracao || "Não informado";
    }

    if (vagaBeneficios) {
        vagaBeneficios.textContent =
            vaga.beneficios || "Não informado";
    }

    if (vagaInicioPrevisto) {
        vagaInicioPrevisto.textContent =
            vaga.inicioPrevisto || "Não informado";
    }
    
    carregarVagasSimilares(vaga.area);
    verificarSeSalva(vaga.idVaga);

}


// ===============================================================
// INICIAR
// ===============================================================

carregarUsuarioSidebar();