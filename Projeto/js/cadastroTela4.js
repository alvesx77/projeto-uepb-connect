const Ilinkedin = document.querySelector(".url-linkedin");
const Igithub = document.querySelector(".url-github");
const Iportfolio = document.querySelector(".url-portfolio");
const btn = document.getElementById("btnFinish");

btn.addEventListener("click", function () {

    let dadosTela = JSON.parse(
        localStorage.getItem("cadastroTela")
    ) || {};

    const visSelecionada = document.querySelector('input[name="vis"]:checked');

    dadosTela.linkLinkedin = Ilinkedin.value;
    dadosTela.linkGithub = Igithub.value;
    dadosTela.linkPortifolio = Iportfolio.value;
    dadosTela.visibilidadePerfil = visSelecionada ? visSelecionada.value : "todos";

    
    localStorage.setItem(
        "cadastroTela",
        JSON.stringify(dadosTela)
    );

    console.log("Dados da tela 4:", dadosTela);

    fetch("http://localhost:8080/cadastrarUsuario", {
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

        window.location.href = "dashboard.html";

    })
    .catch(error => {

        console.error("Erro:", error);
        alert("Erro ao salvar cadastro");

    });

    showSuccess();
});