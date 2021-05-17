// On importe les fonctions du fichier inventoryDataMapper
const { insertProduct, findUserInventory } = require('../dataMappers/inventoryDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON les informations du médicament ajouté à l'inventaire du vendeur
    async createProduct (request, response, next) {
        // Récupère les données à insérer en base de données
        const { name, expiration, quantity, price, cis, user_id } = request.body;

        try {            
            // Envoi les données à la fonction 'insertProduct' du dataMapper et récupère son résultat
            const newProduct = await insertProduct(name, expiration, quantity, price, cis, user_id);

            // Si on ne récupère pas de nouveau médicament, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)            
            if (!newProduct) {
                next();

            } else {
                // Sinon, on envoit au front des infos du médicament sous format JSON avec un statut de succès
                response.status(201).json({ addedProduct: newProduct });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Récupère et renvoit sous format JSON l'inventaire du vendeur
    async getInventory(request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);

        try {
            // Envoi l'id du vendeur à la fonction 'findUserInventory' du dataMapper et récupère les médicaments de son inventaire
            const userInventory = await findUserInventory(userId);
            
            // Envoi au front de l'inventaire du vendeur sous format JSON avec un statut de succès
            response.status(200).json({ 
                status: "success",
                userInventory 
            }); 
            
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },
};