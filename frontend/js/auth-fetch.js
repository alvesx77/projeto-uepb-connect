// ---------------------------------------------------------------
// Wrapper de fetch com revalidação automática de token.
//
// Sempre que uma requisição autenticada retornar 401 (token expirado
// / usuário não autenticado), esse helper chama a rota de refresh
// (/auth/refresh) e, se der certo, repete a requisição original
// automaticamente. Se o refresh falhar, manda o usuário pro login.
//
// Ajuste AUTH_API_URL e o endpoint de refresh abaixo se o nome da
// rota no back for diferente.
//
// Uso: troque `fetch(url, options)` por `fetchComAuth(url, options)`
// em qualquer chamada que dependa do usuário estar logado.
// ---------------------------------------------------------------
const AUTH_API_URL = "https://projeto-uepb-connect-production.up.railway.app";

async function revalidarToken() {
    try {
        const resposta = await fetch(`${AUTH_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });
        return resposta.ok;
    } catch (erro) {
        console.error("Erro ao revalidar token:", erro);
        return false;
    }
}

async function fetchComAuth(url, options = {}) {
    const opcoes = { ...options, credentials: "include" };

    let resposta = await fetch(url, opcoes);

    if (resposta.status === 401) {
        const revalidado = await revalidarToken();

        if (revalidado) {
            // token revalidado com sucesso, repete a requisição original
            resposta = await fetch(url, opcoes);
        } else {
            // refresh falhou, sessão realmente expirou -> volta pro login
            window.location.href = "login.html";
            return resposta;
        }
    }

    return resposta;
}
