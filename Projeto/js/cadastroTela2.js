const Icursos = document.querySelector('.curso');
const Iperiodo = document.querySelector('.periodo');
const Imatricula = document.querySelector('.matricula');
const Icurriculo = document.querySelector('.curriculo');
const btn = document.querySelector(".btn-primary");
const errorBox = document.getElementById("passo2-error");

const API_URL = "http://localhost:8080";

const REGEX = {
  matricula: /^\d{9}$/,
  lattes: /^https?:\/\/lattes\.cnpq\.br\/\d+$/i,
};

function mostrarErro(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
}

function esconderErro() {
    errorBox.classList.remove("show");
}

function validarCurso() {
    return Icursos.value.trim() !== "";
};

function validarPeriodo() {
    return Iperiodo.value.trim() !== "";
};

function validarMatricula(){
    const valor = Imatricula.value.trim();
    if(valor === "") return true;
    return REGEX.matricula.test(valor);
}

function validarCurriculo(){
    const valor = Icurriculo.value.trim();
    if(valor === "") return true;
    return REGEX.lattes.test(valor);
}

function getStatusSelecionado() {
    const card = document.querySelector(".status-card.selected");
    return card ? card.dataset.value : null;
}

async function verificarDisponibilidade(campo, valor) {
    const response = await fetch(
        `${API_URL}/validacao/${campo}?valor=${encodeURIComponent(valor)}`
    );
    if (response.ok) {
        return { disponivel: true };
    }
    if (response.status === 409) {
        const erro = await response.json();
        return { disponivel: false, mensagem: erro.detail };
    }
    throw new Error("Não foi possível verificar a disponibilidade");
}


btn.addEventListener("click", async () => {
    esconderErro();

    if (!validarCurso()) {
        mostrarErro("Informe o curso.");
        return;
    }

    if (!validarPeriodo()) {
        mostrarErro("Informe o período.");
        return;
    }

    if(!validarMatricula()) {
        mostrarErro("Informe uma matrícula válida (9 dígitos).");
        return;
    }

    if(!validarCurriculo()) {
        mostrarErro("Informe um link válido para o currículo Lattes (ex: http://lattes.cnpq.br/0000000000000000)."
        );
        return;
    }

    const situacaoEmpregabilidade = getStatusSelecionado();
    if (!situacaoEmpregabilidade) {
        mostrarErro("Selecione sua situação de empregabilidade.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Verificando...";

    try {
    if (Imatricula.value.trim() !== "") {
        const resultadoMatricula = await verificarDisponibilidade(
            "matricula",
            Imatricula.value.trim()
        );
        if (!resultadoMatricula.disponivel) {
            mostrarErro(resultadoMatricula.mensagem);
            return;
        }
    }

    let dadosTela = JSON.parse(localStorage.getItem("cadastroTela")) || {};
    dadosTela.curso = Icursos.value;
    dadosTela.periodo = Iperiodo.value;
    dadosTela.matricula = Imatricula.value.trim();
    dadosTela.situacaoEmpregabilidade = situacaoEmpregabilidade;
    dadosTela.curriculo = Icurriculo.value.trim();

    localStorage.setItem("cadastroTela", JSON.stringify(dadosTela));
    window.location.href = "cadastro-passo3.html";

} catch (erro) {
    mostrarErro(erro.message);
} finally {
    btn.disabled = false;
    btn.textContent = "Próximo";
}
});