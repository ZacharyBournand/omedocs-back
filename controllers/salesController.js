// On importe les fonctions du fichier orderDataMapper
const { findSales, updateOrderStatus } = require('../dataMappers/salesDataMapper');

// On export notre fonction
module.exports = {
    // Récupère et renvoit sous format JSON l'historique de ventes d'un utilisateur
    async getSales (request, response, next) {
        // Récupère l'id de l'utilisateur et le parse en integer
        const userId = parseInt(request.params.user_id, 10);
        
        try {
            // Envoi l'id de l'utilisateur à la fonction 'findSales' du dataMapper et récupère son historique de ventes
            const sales = await findSales(userId);

            // Pour chaque vente faite, on simplifie la date sous format YYYY-MM-DD
            for (let sale of sales) {
                sale["date"] = sale.date.toISOString().split('T')[0];
            };

            // Envoi au front de l'historique de ventes de l'utilisateur sous format JSON avec un statut de succès
            response.status(200).json({
                status: "success",
                sales
            });
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch(error) {
            next(error);
        }
    }, 

    // Récupère et renvoit sous format JSON les informations de la commande contenant les produits vendus par l'utilisateur avec 
    // son statut de livraison modifié
    async editOrderStatus (request, response, next) {
        // On récupère le numéro de commande
        const orderNumber = request.params.orderNumber;
        // On récupère aussi le nouveau statut de livraison de la commande
        const { newStatus } = request.body; 

        try {
            // Envoi du numéro de commande et du nouveau statut de livraison à la fonction 'updateOrderStatus' du dataMapper et 
            // récupère les infos de la commande avec son statut de livraison modifié
            const order = await updateOrderStatus(newStatus, orderNumber);

            // On simplifie la date sous format YYYY-MM-DD
            order["date"] = order.date.toISOString().split('T')[0];

            // Si on ne récupère pas de commande, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!order) {
                next();
            } else {
                // Sinon, on envoit au front des infos de la commande sous format JSON avec un statut de succès
                response.status(200).json({
                    status: "success",
                    order
                });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch(error) {
            next(error);
        }
    }
}