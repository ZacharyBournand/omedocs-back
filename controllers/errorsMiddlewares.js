module.exports = {
    // Renvoit l'erreur 404 avec des informations.
    // Middleware Express standard
    async error404(request, response) {
        response.status(404).json({
            error: {
                message: "Ressource not found",
                url: request.url,
                method: request.method
            }
        });
    },

    // Renvoit l'erreur 500 avec des informations.
    // Middleware Express de gestion d'erreur qui contient 4 paramètres: le 1er est un objet contenant les informations sur l'erreur 
    // et les autres sont les param. classiques des middlewares. On tombe dans ce middleware quand, depuis un autre fichier, on appelle 
    // next() en lui passant un argument qui deviendra ce 1er paramètre de notre middleware
    async error500(error, request, response, next) {
        response.status(500).json({
            error: {
                message: "Fatal error",
                messageDetail: error.message,
                infos: error
            }
        });
    }
}