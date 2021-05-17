// On importe les fonctions du fichier listProductsDataMapper
const { findProductsByName, findProductsByCis } = require('../dataMappers/listProductsDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON le/les médicament(s)
    async getProductsByName (request, response, next) {
        // On récupère une partie/la totalité du nom du/des médicament(s)
        const productsValue = request.query.value;

        try {
            // Envoi de la donnée à la fonction 'findProductsByName' du dataMapper et récupère le/les médicament(s)
            const products = await findProductsByName(productsValue);
            
            // Envoi au front du/des médicament(s) sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                products
            }); 
            
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Récupère et renvoit sous format JSON le/les médicament(s)
    async getProductsByCis (request, response, next) {
        // On récupère une partie/la totalité du nom du/des médicament(s)
        const productsValue = request.query.value;

        try {
            // Envoi de la donnée à la fonction 'findProductsByCis' du dataMapper et récupère le/les médicament(s)
            const products = await findProductsByCis(productsValue);

            // Envoi au front du/des médicament(s) sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                products
            }); 
            
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }
}