// On importe les fonctions du fichier profileDataMapper
const { updateEmail, updatePhoneNumber } = require('../dataMappers/profileDataMapper');

// On export nos fonctions
module.exports = {
    // Récupère et renvoit sous format JSON les informations du profil modifié de l'utilisateur
    async editEmail (request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);

        try {
            // Envoi l'id de l'utilisateur à la fonction 'updateEmail' du dataMapper et récupère les infos de son profil modifié
            const profile = await updateEmail(request.body.newEmail, userId);

            // Si on ne récupère pas d'utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!profile) {
                next();

            } else {
                // Sinon, on envoit au front des infos de l'utilisateur sous format JSON avec un statut de succès
                response.status(200).json({
                    status: "success",
                    profile
                });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Récupère et renvoit sous format JSON les informations du profil modifié de l'utilisateur
    async editPhoneNumber(request, response, next) {
        // On récupère l'id de l'utilisateur et on le parse en integer
        const userId = parseInt(request.params.userId, 10);

        try {
            // Envoi l'id de l'utilisateur à la fonction 'updatePhoneNumber' du dataMapper et récupère les infos de son profil modifié
            const profile = await updatePhoneNumber(request.body.newPhoneNumber, userId);

            // Si on ne récupère pas d'utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404) 
            if (!profile) {
                next();

            } else {
                // Sinon, on envoit au front des infos de l'utilisateur sous format JSON avec un statut de succès
                response.status(200).json({
                    status: "success",
                    profile
                });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }
}