// On importe les fonctions du fichier inventoryDataMapper
const { insertProduct, findUserInventory } = require('../dataMappers/inventoryDataMapper');

// On export nos fonctions
module.exports = {

    // Récupère et renvoit sous format JSON les informations du médicament ajouté à l'inventaire du vendeur
    async createProduct (request, response) {
        // Récupère les infos du médicament
        const newProduct = await insertProduct(
            request.body.name,
            request.body.expiration,
            request.body.quantity,
            request.body.price,
            request.body.cis,
            request.body.user_id,
        );

        // Si on ne récupère pas de médicament, on envoit une erreur indiquant une mauvaise requête du client (400)
        if (!newProduct) {
            response.status(400).json({
                error: {
                    message: "newProduct_impossible"
                }
            });
            return;
        }

        // Envoi des infos du médicament sous format JSON avec un status de succès
        response.status(201).json({ addedProduct: newProduct });
    },

    // Récupère et renvoit sous format JSON l'inventaire du vendeur
    async getInventory(request, response) {
        // On récupère l'id de l'utilisateur ...
        const { userId } = request.params;
            

        const userInventory = await findUserInventory(userId);

        // Si aucun inventaire de l'utilisateur n'est trouvé, on renvoit une erreur d'authentification (401)
        if (! userInventory) {
            response.status(401).json({
                error: {
                    name: "authentification_error",
                    detail: "bad-credentials"
                }
            });
         };
        
        response.status(200).json({ 
            status: "success",
            userInventory, 
        });   
    },

};