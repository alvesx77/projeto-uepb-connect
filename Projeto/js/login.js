const Iemail = document.querySelector(".email");
const Isenha = document.getElementById("senhaInput");
const btnLogin = document.getElementById("btnLogin");
const errorBox = document.getElementById("login-error");
const toggleSenha = document.getElementById("toggleSenha");

const DOMINIO_INSTITUCIONAL = "@aluno.uepb.edu.br";
const API_URL = "http://localhost:8080";

function mostrarErro(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
}
function esconderErro() {
    errorBox.classList.remove("show");
}

function validarEmailInstitucional(email) {
    return email.trim().toLowerCase().endsWith(DOMINIO_INSTITUCIONAL);
}

// Olhinho: mostra/esconde a senha digitada
toggleSenha.addEventListener("click", function () {
    const isPassword = Isenha.type === "password";
    Isenha.type = isPassword ? "text" : "password";
    toggleSenha.innerHTML = isPassword
        ? '<i class="ti ti-eye-off"></i>'
        : '<i class="ti ti-eye"></i>';
});

async function fazerLogin(email, senha) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailInstitucional: email, senha })
    });

    if (!response.ok) {
        const mensagemErro = await response.text();
        throw new Error(mensagemErro || "Erro ao fazer login");
    }

    return response.json(); // { id, nomeCompleto, emailInstitucional, tipoUsuario }
}

btnLogin.addEventListener("click", async function () {
    esconderErro();

    if (Iemail.value.trim() === "") {
        mostrarErro("Informe seu e-mail.");
        return;
    }
    if (!validarEmailInstitucional(Iemail.value)) {
        mostrarErro("Use seu e-mail institucional (" + DOMINIO_INSTITUCIONAL + ").");
        return;
    }
    if (Isenha.value.trim() === "" || Isenha.value.length < 8) {
        mostrarErro("Informe sua senha (mínimo 8 caracteres).");
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = "Entrando...";

    try {
        const usuario = await fazerLogin(Iemail.value.trim(), Isenha.value);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        console.log("Login bem-sucedido:", usuario);
        //window.location.href = "dashboard.html";

    } catch (erro) {
        mostrarErro(erro.message);

    } finally {
        btnLogin.disabled = false;
        btnLogin.textContent = "Entrar";
    }
});