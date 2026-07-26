const API_URL = "http://localhost:8080/retornarDadosDashboard";


async function carregarUsuario(){

    try {

        const resposta = await fetch(API_URL, {
            method: "GET",
            credentials: "include"
        });


        if(!resposta.ok){
            window.location.href = "login.html";
            return;
        }



        const usuario = await resposta.json();

        console.log(usuario);

        preencherDados(usuario);


    } catch(error){

        console.error("Erro ao buscar usuário:", error);

    }

}

function renderTagList(containerId, lista) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = '<span class="ptag-empty">Nenhuma selecionada</span>';
        return;
    }

    lista.forEach(item => {
        const span = document.createElement("span");
        span.className = "ptag tech";
        span.textContent = item;
        container.appendChild(span);
    });
}

function preencherDados(usuario){

    document.getElementById("nome-sidebar").textContent =
    usuario.nomeCompleto;

    document.getElementById("curso-sidebar").textContent =
    `${usuario.curso} · ${usuario.periodo}`;

    document.querySelector(".profile-name").textContent =
        usuario.nomeCompleto;

    document.getElementById("nome-topbar").textContent =
        " " + usuario.nomeCompleto.split(" ")[0];

    document.querySelector(".profile-sub").textContent =
        `${usuario.curso} · UEPB`;


    document.querySelector(".profile-status").innerHTML =
        `<div class="profile-dot"></div> ${usuario.situacaoEmpregabilidade}`;


    document.querySelector(".profile-stat span").textContent =
        usuario.periodo;
    const iniciais = usuario.nomeCompleto
        .split(" ")
        .map(nome => nome[0])
        .slice(0,2)
        .join("");


    document.querySelector(".avatar").textContent = iniciais;
    document.querySelector(".av-circle").textContent = iniciais;

    const areasContainer = document.getElementById("areas-container");
    areasContainer.innerHTML = "";
    usuario.areasAfinidades.forEach(area => {
        const span = document.createElement("span");
        span.className = "ptag area";
        span.textContent = area;
        areasContainer.appendChild(span);
    });

    renderTagList("linguagens-container", usuario.linguagens);
    renderTagList("frameworks-container", usuario.frameworks);
    renderTagList("cloud-container", usuario.clouds);
    renderTagList("bancoDados-container", usuario.bancoDados);

}


carregarUsuario();