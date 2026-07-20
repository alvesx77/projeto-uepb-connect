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

function preencherDados(usuario){

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

    const linguagensContainer = document.getElementById("linguagens-container");
    linguagensContainer.innerHTML = "";
    usuario.linguagens.forEach(linguagem => {
        const span = document.createElement("span");
        span.className = "ptag tech";
        span.textContent = linguagem;
        linguagensContainer.appendChild(span);
    });

}


carregarUsuario();