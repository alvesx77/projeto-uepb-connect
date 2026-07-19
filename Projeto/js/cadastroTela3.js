const btn = document.querySelector(".btn-primary");

function obterDados() {
    const areasAfinidade = [...document.querySelectorAll(".sel-area")]
        .map(el => el.textContent.trim());

    const linguagens = [];
    const frameworks = [];
    const cloud = [];
    const bancoDados = [];

    document.querySelectorAll(".sel-tech").forEach(el => {
        const categoria = el.dataset.category;
        const nome = el.textContent.trim();

        switch (categoria) {
            case "linguagens":
                linguagens.push(nome);
                break;

            case "frameworks":
                frameworks.push(nome);
                break;

            case "cloud":
                cloud.push(nome);
                break;

            case "bancoDados":
                bancoDados.push(nome);
                break;
        }
    });

    return {
        areasAfinidade,
        linguagens,
        frameworks,
        cloud,
        bancoDados
    };
}

function validarAreasDeAfinidade() {
    return document.querySelectorAll(".sel-area").length > 0;
}

function validarLinguagens() {
    return document.querySelectorAll(".sel-tech").length > 0;
}

btn.addEventListener("click", () => {

    if (!validarAreasDeAfinidade()) {
        alert("Selecione pelo menos uma área de afinidade.");
        return;
    }

    if (!validarLinguagens()) {
        alert("Selecione pelo menos uma linguagem ou tecnologia.");
        return;
    }

    const dadosPasso3 = obterDados();

    let dadosTela = JSON.parse(
        localStorage.getItem("cadastroTela")
    ) || {};

    dadosTela.areasAfinidade = dadosPasso3.areasAfinidade;
    dadosTela.linguagens = dadosPasso3.linguagens;
    dadosTela.frameworks = dadosPasso3.frameworks;
    dadosTela.cloud = dadosPasso3.cloud;
    dadosTela.bancoDados = dadosPasso3.bancoDados;

    localStorage.setItem(
        "cadastroTela",
        JSON.stringify(dadosTela)
    );

    window.location.href = "cadastro-passo4.html";
});