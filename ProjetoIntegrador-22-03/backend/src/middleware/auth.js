// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: auth.js
// -- Camada intermediária entre um cliente e um servidor
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à função next()

import jwt from "jsonwebtoken";

// Verifica se o usuário está logado
export function auth(req, res, next) 
{
    
    // Pega o token do cliente
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    // split(" ") divide a string pelo espaço e pega o segundo elemento do array [1]
    // ["Bearer", "eyJhbGciOiJIUzI1NiIs..."]
    const token = authHeader.split(" ")[1];

    try {
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adiciona o usuário dentro da requisição
        req.user = decoded;

        // Libera o acesso
        return next();
    } catch (error) {
        // Caso contrário, não libera o acesso
        return res.status(401).json({ error: "Token inválido" });
    }

};