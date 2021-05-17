// On importe les fonctions du fichier listEstablishmentsDataMapper
const {findEstablishments } = require('../dataMappers/listEstablishmentsDataMapper');

// On export notre fonction
module.exports = {
    // Récupère et renvoit sous format JSON l'/les organismes
    async getsListEstablishments (request, response, next) {
        // On récupère une partie/la totalité du nom de l'/des organisme(s) et/ou la région
        const {value, region} = request.query

        try {
            // Envoi des données à la fonction 'findEstablishments' du dataMapper et récupère l'/les organisme(s)
            const establishments = await findEstablishments(value, region);
            
            // Envoi au front de l'/des organisme(s) sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                establishments
            }); 
            
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        } 
    }
}
