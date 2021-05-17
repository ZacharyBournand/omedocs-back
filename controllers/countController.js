// On importe les fonctions du fichier inventoryDataMapper
const { countUsers, countProducts } = require('../dataMappers/countDataMapper');

// On export nos fonctions
module.exports = {
    async getCount (request, response, next) {
        try {
            // Récupère le nombre d'utilisateurs classés par type d'usage (acheteur ou vendeur)
            const users = await countUsers();
            // Récupère le nombre de médicaments vendus sur le site
            const products = await countProducts();
            
            // Envoi au front du nombre d'acheteurs, de vendeurs et de médicaments sous format JSON avec un statut de succès
            response.status(201).json({ users, products });
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }
}