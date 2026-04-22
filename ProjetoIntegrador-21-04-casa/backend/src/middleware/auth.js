// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: auth.js
// -- Camada intermediária entre um cliente e um servidor
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à função next()

import jwt from "jsonwebtoken";

// Verifica se o usuário está logado
export function auth(req, res, next) 
{
    
    // Pega o token do usuário
    const authHeader = req.headers.authorization;

    // Se não tiver o token do usuário
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    // split(" ") divide a string pelo espaço e pega o segundo elemento do array [1]
    // ["Bearer", "eyJhbGciOiJIUzI1NiIs..."]
    const token = authHeader.split(" ")[1];

    try {
        // Verifica se token foi realmente gerado pelo servidor usando o mesmo JWT_SECRET
        // Se for inválido o verify envia um erro e vai para o catch (error)
        // Verifica o algoritmo do token, geralmente HASH e SHA
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Se o token for válido
        // Adiciona o usuário dentro da requisição
        req.user = decoded;

        // Libera o acesso
        return next();
    } catch (error) {
        // Caso contrário, não libera o acesso
        return res.status(401).json({ error: "Token inválido" });
    }

};