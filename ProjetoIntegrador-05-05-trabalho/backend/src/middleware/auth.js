// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: auth.js
// -- Camada intermediária entre um cliente e um servidor
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à função next()

import jwt from "jsonwebtoken";

// Verifica se o usuário está logado
export function auth(req, res, next) 
{
    
    // Salva o JWT inteiro dentro do cookie chamado 'token'
    // JWT = header.payload.signature
    const token = req.cookies.token;

    // Se não existir o cookie
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        // Verifica se token foi realmente gerado pelo servidor usando o mesmo JWT_SECRET
        // Se for inválido o verify envia um erro e vai para o catch (error)
        // Verifica o algoritmo do token, HMAC-SHA256
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Se o token for válido
        // Adiciona o usuário dentro da requisição
        req.user = decoded;

        // Libera o acesso
        return next(); // leva pro idAdmin ou outras rotas

    } catch (error) {
        // Caso contrário, não libera o acesso
        return res.status(401).json({ error: "Token inválido" });
    }

};