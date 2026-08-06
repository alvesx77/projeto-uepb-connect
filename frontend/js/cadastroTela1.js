const Inome = document.querySelector(".nomeCompleto");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");
const Isenha = document.querySelector(".senha");
const IconfirmaSenha = document.querySelector(".confirmarSenha");
const btn = document.querySelector(".btn-primary");
const errorBox = document.getElementById("passo1-error");

const API_URL = "http://localhost:8080";

const REGEX = {
    nome: /^[A-Za-zÀ-ÖØ-öø-ÿ']+(\s[A-Za-zÀ-ÖØ-öø-ÿ']+)+$/,
    emailInstitucional: /^[\w.+-]+@(aluno|servidor)\.uepb\.edu\.br$/i,
    telefoneFormatado: /^\(\d{2}\)\d{5}-\d{4}$/,
};

function mostrarErro(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
}
function esconderErro() {
    errorBox.classList.remove("show");
}

function formatarTelefone(valor){
    const digitos = valor.replace(/\D/g, "").slice(0,11);

    if (digitos.length > 10) {
        return digitos.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1)$2-$3");
    }

    if (digitos.length > 6) {
        return digitos.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1)$2-$3");
    }

    if (digitos.length > 2) {
        return digitos.replace(/(\d{2})(\d{0,5})/, "($1)$2");
    }

    if (digitos.length > 0) {
        return digitos.replace(/(\d{0,2})/, "($1");
    }
    return digitos;
}   

Itelefone.addEventListener("input", () =>{
    Itelefone.value = formatarTelefone(Itelefone.value);
});

function validarNome() {
    return REGEX.nome.test(Inome.value.trim());
}

function validarEmail() {
    return Iemail.value.trim() !== "";
}

function validarEmailInstitucional() {
    return REGEX.emailInstitucional.test(Iemail.value.trim());
}

function validarTelefone() {
    return REGEX.telefoneFormatado.test(Itelefone.value.trim());
}

function validarSenha() {
    return Isenha.value === IconfirmaSenha.value && Isenha.value.length >= 8;
}

async function verificarDisponibilidade(campo, valor) {

    const response = await fetch(
        `${API_URL}/validacao/${campo}?valor=${encodeURIComponent(valor)}`
    );
   
    if (response.ok) {
        return{disponivel: true};
    }
    if (response.status === 409) {
        const erro = await response.json();
        return { disponivel: false, mensagem: erro.detail};
    }
    throw new Error("Nao foi possivel verificar a disponibilidade");    
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
        mostrarErro("Use o seu email institucional da UEPB (@aluno.uepb.edu.br ou @servidor.uepb.edu.br)."
        );
        return;
    }

    if (!validarTelefone()) {
        mostrarErro("Informe um telefone válido no formato (99)99999-9999.");
        return;
    }

    if (!validarSenha()) {
        mostrarErro("As senhas não conferem ou têm menos de 8 caracteres.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Verificando...";

    try {
        const resultadoEmail = await verificarDisponibilidade(
            "email",
            Iemail.value.trim()
        );
        if (!resultadoEmail.disponivel) {
            mostrarErro(resultadoEmail.mensagem);
            return;
        }

        const resultadoTelefone = await verificarDisponibilidade(
            "telefone",  Itelefone.value.trim()
        );
        if (!resultadoTelefone.disponivel) {
            mostrarErro(resultadoTelefone.mensagem);
            return;
        }

        const dadosTela = {
            nomeCompleto: Inome.value.trim(),
            emailInstitucional: Iemail.value.trim(),
            telefone: Itelefone.value.trim(),
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