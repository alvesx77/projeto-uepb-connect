const SIDEBAR_API_URL = "http://localhost:8080/retornarDadosPerfil";

function iniciaisNomeSidebar(nome) {
    if (!nome || !nome.trim()) return "??";
    const partes = nome.trim().split(/\s+/);
    const primeira = partes[0][0] || "";
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
    return (primeira + ultima).toUpperCase();
}

function preencherSidebarUsuario(dados) {
    const circleEl = document.getElementById("sidebar-avatar");
    const nomeEl = document.getElementById("sidebar-nome");
    const cursoEl = document.getElementById("sidebar-curso");

    if (!circleEl || !nomeEl || !cursoEl) return;

    circleEl.textContent = iniciaisNomeSidebar(dados.nomeCompleto);
    nomeEl.textContent = dados.nomeCompleto && dados.nomeCompleto.trim()
        ? dados.nomeCompleto
        : "Nome não informado";
    cursoEl.textContent = [dados.curso, dados.periodo].filter(Boolean).join(" · ") || "Curso não informado";
}

async function carregarUsuarioSidebar() {
    // Evita chamada duplicada em páginas que já buscam o perfil (ex: perfil.html)
    if (window.__usuarioJaCarregadoNaSidebar) return;

    try {
        const resposta = await fetchComAuth(SIDEBAR_API_URL, { method: "GET" });
        if (!resposta.ok) return;

        const usuario = await resposta.json();
        preencherSidebarUsuario(usuario);

    } catch (erro) {
        console.error("Erro ao carregar dados do usuário na sidebar:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarUsuarioSidebar);