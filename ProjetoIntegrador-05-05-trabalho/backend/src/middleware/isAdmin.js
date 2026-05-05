// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: isAdmin.js
// -- Camada intermediária entre um cliente e um servidor
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Verifica se é administrador
export function isAdmin(req, res, next) 
{

    // Se não for admin bloqueia o acesso
    if (!req.user || !req.user.is_admin) {
        return res.status(403).json({
            error: "Apenas administradores podem acessar"
        });
    }

    // Se for admin libera o acesso
    return next(); // Leva para as outras rotas
    
}