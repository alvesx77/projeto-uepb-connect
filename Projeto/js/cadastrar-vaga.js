const API_URL = "http://localhost:8080/cadastrarVaga";

// ---------------------------------------------------------------
// Só ADMIN pode acessar essa tela (mesmo critério usado em vagas.js
// para exibir o botão "Nova vaga")
// ---------------------------------------------------------------
if (localStorage.getItem("tipoUsuario") !== "ADMIN") {
    window.location.href = "vagas.html";
}

const form = document.getElementById("form-vaga");
const toast = document.getElementById("toast");

const tipoEmpregoGrid = document.getElementById("tipoEmpregoGrid");
const tipoEmpregoInput = document.getElementById("tipoEmprego");

const modoTrabalhoGrid = document.getElementById("modoTrabalhoGrid");
const modoTrabalhoInput = document.getElementById("modoTrabalho");

const linguagensChips = document.getElementById("linguagens-chips");
const frameworksChips = document.getElementById("frameworks-chips");

// ---------------------------------------------------------------
// Seleção única (status-card): tipo de emprego / modo de trabalho
// ---------------------------------------------------------------
function configurarSelecaoUnica(grid, hiddenInput) {
    grid.querySelectorAll(".status-card").forEach(card => {
        card.addEventListener("click", () => {
            grid.querySelectorAll(".status-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            hiddenInput.value = card.dataset.value;
        });
    });
}
configurarSelecaoUnica(tipoEmpregoGrid, tipoEmpregoInput);
configurarSelecaoUnica(modoTrabalhoGrid, modoTrabalhoInput);

// ---------------------------------------------------------------
// Seleção múltipla (chips): linguagens / frameworks
// ---------------------------------------------------------------
function configurarChips(container) {
    container.querySelectorAll(".chip").forEach(chip => {
        chip.addEventListener("click", () => {
            chip.classList.toggle("selected");
        });
    });
}
configurarChips(linguagensChips);
configurarChips(frameworksChips);

function valoresSelecionados(container) {
    return [...container.querySelectorAll(".chip.selected")].map(c => c.dataset.value);
}

// ---------------------------------------------------------------
// Envio do formulário
// ---------------------------------------------------------------
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!tipoEmpregoInput.value) {
        alert("Selecione o tipo de emprego.");
        return;
    }
    if (!modoTrabalhoInput.value) {
        alert("Selecione o modo de trabalho.");
        return;
    }

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        local: document.getElementById("local").value.trim(),
        nomeVaga: document.getElementById("nomeVaga").value.trim(),
        area: document.getElementById("area").value,
        linguagens: valoresSelecionados(linguagensChips),
        frameworks: valoresSelecionados(frameworksChips),
        tipoEmprego: tipoEmpregoInput.value,
        modoTrabalho: modoTrabalhoInput.value,
        sobreVaga: document.getElementById("sobreVaga").value.trim(),
        requisitos: document.getElementById("requisitos").value.trim(),
        detalhes: document.getElementById("detalhes").value.trim()
    };

    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error("Falha ao cadastrar vaga");
        }

        toast.classList.add("show");
        setTimeout(() => {
            window.location.href = "vagas.html";
        }, 1200);

    } catch (error) {
        console.error("Erro ao cadastrar vaga:", error);
        alert("Não foi possível cadastrar a vaga. Tente novamente.");
        btnSubmit.disabled = false;
    }
});
