// On importe les fonctions du fichier editInventoryDataMapper
const { deleteProduct, updateProduct } = require('../dataMappers/editInventoryDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON les informations du médicament supprimé de l'inventaire du vendeur
    async removeProduct (request, response, next) {
        // On récupère l'id du médicament et on le parse en integer
        const productId = parseInt(request.params.productId, 10);

        try {
            // Envoi l'id du médicament à la fonction 'deleteProduct' du dataMapper et récupère les infos du médicament supprimé
            const product = await deleteProduct(productId);

            // Si on ne récupère pas de médicament, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!product) {
                next();
            
            } else {
                // Sinon, on envoit au front des infos du médicament sous format JSON avec un statut de succès
                response.status(200).json({ 
                    status: "success",
                    product
                }); 
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error); 
        }
    },

    // Récupère et renvoit sous format JSON les informations, y compris la quantité modifiée, du médicament de l'inventaire du vendeur
    async modifyProduct (request, response, next) {
        // On récupère l'id du médicament et on le parse en integer
        const productId = parseInt(request.params.productId, 10);

        try {
            // Envoi l'id du médicament à la fonction 'updateProduct' du dataMapper et récupère les infos du médicament avec 
            // la nouvelle quantité
            const product = await updateProduct(request.body.quantity, productId);
            
            // Si on ne récupère pas de médicament, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!product) {
                next();
                
            } else {
                // Sinon, on envoit au front des infos du médicament sous format JSON avec un statut de succès
                response.status(200).json({ 
                    status: "success",
                    product 
                }); 
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error); 
        }
    }
}