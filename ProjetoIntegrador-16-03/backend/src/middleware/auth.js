// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: auth.js
// -- Camada intermediária entre um cliente e um servidor
// -- Middleware: software que permite a comunicação entre diferentes aplicações
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à função next()

function authToken(req, res, next) {
    
    // Lógica do middleware
    next(); // Chama o próximo middleware

}