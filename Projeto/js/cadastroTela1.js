const Inome = document.querySelector(".nomeCompleto");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");
const Isenha = document.querySelector(".senha");
const IconfirmaSenha = document.querySelector(".confirmarSenha");
const btn = document.querySelector(".btn-primary");
const errorBox = document.getElementById("passo1-error");

const DOMINIO_INSTITUCIONAL = "@aluno.uepb.edu.br";
const API_URL = "http://localhost:8080";

function mostrarErro(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
}
function esconderErro() {
    errorBox.classList.remove("show");
}

function validarNome() {
    return Inome.value.trim() !== "";
}

function validarEmail() {
    return Iemail.value.trim() !== "";
}

function validarEmailInstitucional() {
    return Iemail.value.trim().toLowerCase().endsWith(DOMINIO_INSTITUCIONAL);
}

function validarTelefone() {
    const apenasNumeros = Itelefone.value.replace(/\D/g, "");
    return apenasNumeros.length === 11;
}

function validarSenha() {
    return Isenha.value === IconfirmaSenha.value && Isenha.value.length >= 8;
}

async function verificarDisponibilidade(campo, valor) {

    const reponse = await fetch(`${API_URL}/validacao/${campo}?valor=${encodeURIComponent(valor)}`);
   
    if (reponse.ok) {
        return{disponivel: true};
    }
    if (reponse.status === 409) {
        const erro = await reponse.json();
        return { disponivel: false, mensagem: erro.detail};
    }
    throw new Error("nao foi possivel verificar a disponibilidade");    
}

btn.addEventListener("click",async () => {
    esconderErro();

    if (!validarNome()) {
        mostrarErro("Informe o nome completo.");
        return;
    }

    if (!validarEmail()) {
        mostrarErro("Informe o e-mail.");
        return;
    }

    if (!validarEmailInstitucional()) {
        mostrarErro("Use seu e-mail institucional (" + DOMINIO_INSTITUCIONAL + ").");
        return;
    }

    if (!validarTelefone()) {
        mostrarErro("Informe o telefone.");
        return;
    }

    if (!validarSenha()) {
        mostrarErro("As senhas não conferem ou têm menos de 8 caracteres.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Verificando...";

    try {
        const resultadoEmail = await verificarDisponibilidade("email", Iemail.value.trim());
        if (!resultadoEmail.disponivel) {
            mostrarErro(resultadoEmail.mensagem);
            return;
        }

        const telefoneNumeros = Itelefone.value.replace(/\D/g, "");
        const resultadoTelefone = await verificarDisponibilidade("telefone", telefoneNumeros);
        if (!resultadoTelefone.disponivel) {
            mostrarErro(resultadoTelefone.mensagem);
            return;
        }

        const dadosTela = {
            nomeCompleto: Inome.value,
            emailInstitucional: Iemail.value,
            telefone: telefoneNumeros,
            senha: Isenha.value
        };

        
        localStorage.setItem("cadastroTela", JSON.stringify(dadosTela));
        window.location.href = "cadastro-passo2.html";

    } catch (erro) {
        mostrarErro(erro.message);
    } finally {
        btn.disabled = false;
        btn.textContent = "Próximo";
    }
});