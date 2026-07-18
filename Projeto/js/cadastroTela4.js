const Ilinkedin = document.querySelector(".url-linkedin");
const Igithub = document.querySelector(".url-github");
const Iportfolio = document.querySelector(".url-portfolio");
const btn = document.getElementById("btnFinish");
const errorBox = document.getElementById("passo4-error");

const API_URL = "http://localhost:8080";

const REGEX = {
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/i,
    github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/i,
    portfolio: /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i,
};

function mostrarErro(msg){
    errorBox.textContent = msg;
    errorBox.classList.add("show");
}

function esconderErro(){
    errorBox.classList.remove("show");
}

function validarLinkedin() {
    const valor = Ilinkedin.value.trim();
    if(valor === "") return true;
    return REGEX.linkedin.test(valor);
}

function validarGithub(){
    const valor = Igithub.value.trim();
    if(valor === "") return true;
    return REGEX.github.test(valor);
}

function validarPortfolio(){
    const valor = Iportfolio.value.trim();
    if(valor === "") return true;
    return REGEX.portfolio.test(valor);
}

btn.addEventListener("click", function () {
    esconderErro();

    if(!validarLinkedin()){
        mostrarErro("URL do LinkedIn inválida. (ex: https://www.linkedin.com/in/seu-usuario/).");
        return;
    }

    if(!validarGithub()){
        mostrarErro("URL do GitHub inválida. (ex: https://github.com/seu-usuario).");
        return;
    }

    if(!validarPortfolio()){
        mostrarErro("URL do Portfólio inválida. (ex: https://www.seusite.com).");
        return;
    }

    let dadosTela = JSON.parse(
        localStorage.getItem("cadastroTela")
    ) || {};

    const visSelecionada = document.querySelector('input[name="vis"]:checked');

    dadosTela.linkLinkedin = Ilinkedin.value.trim();
    dadosTela.linkGithub = Igithub.value.trim();
    dadosTela.linkPortifolio = Iportfolio.value.trim();
    dadosTela.visibilidadePerfil = visSelecionada ? visSelecionada.value : "todos";

    
    localStorage.setItem(
        "cadastroTela",
        JSON.stringify(dadosTela)
    );

    console.log("Dados da tela 4:", dadosTela);

    fetch(`${API_URL}/cadastrarUsuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosTela)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Erro ao cadastrar usuário");
        }
        return response.json();
    })
    .then(resposta => {
        console.log("Usuário salvo:", resposta);

        localStorage.removeItem("cadastroTela");

        showSuccess();

        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.error("Erro:", error);
        mostrarErro("Erro ao salvar cadastro. Tente novamente.");
    })
    .finally(() => {
        btn.disabled = false;
    });
});