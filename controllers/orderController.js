// On importe les fonctions du fichier orderDataMapper
const { selectOrderNumbers, insertOrder, selectOrders } = require('../dataMappers/orderDataMapper');
// On récupère la librarie 'randomstring' qui crée une chaîne de caractères aléatoire
const randomstring = require('randomstring');

// On export notre fonction
module.exports =  {
    // Récupère et renvoit sous format JSON les informations de la commande
    async createOrder (request, response, next) {
        // Récupère l'id de l'acheteur et le parse en integer
        const buyerId = parseInt(request.params.userId, 10);
        // Récupère le montant total de la commande et l'id de la pharmacie qui a vendu les produits de cette commande
        const { total_cost, pharmacyid } = request.body;
        
        // Notre but est de générer une chaîne numérique aléatoire et unique. Voici les étapes:
        // 1. On génèrer une chaîne numérique de 8 chiffres aléatoires
        const generateString = randomstring.generate({ length: 8, charset: 'numeric' });

        try {
            // 2. On récupère tous les numéros de commande
            const orderNumbers = await selectOrderNumbers();

            // 3. S'il y en a, pour chaque numéro de commande, on vérifie si notre numéro aléatoire généré correspond à un des numéros de commande 
            // qui existent déjà
            if (orderNumbers) {
                // Pour chaque ligne renvoyée,
                for (let orderNumber of orderNumbers) {
                    // on récupère juste la valeur qui correspond au numéro de commande, pas la clé "order_number".
                    const value = orderNumber.order_number;

                    // Si le numéro de commande correspond à notre numéro aléatoire généré, 
                    if (value == generateString) {
                        // on génère un nouveau numéro aléatoire.
                        generateString = randomstring.generate(17);
                    }
                }
            };

            // Envoi des données à la fonction 'insertOrder' du dataMapper et récupère la nouvelle commande créée
            const newOrder = await insertOrder(generateString, total_cost, buyerId, pharmacyid);
            // La date, crée automatiquement dès que la commande est faite, est de type timestamptz donc on la simplifie sous format YYYY-MM-DD
            newOrder["date"] = newOrder.date.toISOString().split('T')[0];

            // Envoi au front de la nouvelle commande sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                newOrder
            }); 
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch(error) {
            next(error);
        }
    },
    
    // Récupère et renvoit sous format JSON l'historique de commandes d'un utilisateur
    async getOrders (request, response, next) {
        // Récupère l'id de l'utilisateur et le parse en integer
        const userId = parseInt(request.params.userId, 10);

        try {
            // Envoi l'id de l'utilisateur à la fonction 'selectOrders' du dataMapper et récupère son historique de commandes
            const orders = await selectOrders(userId);
            
            // Pour chaque commande faite, on simplifie la date sous format YYYY-MM-DD
            for (let order of orders) {
                order["date"] = order.date.toISOString().split('T')[0];
            };

            // Envoi au front de l'historique de commandes de l'utilisateur sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                orders 
            }); 
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch(error) {
            next(error);
        }
    }
}
