/* ! PAS ENCORE UTILISÉ */

// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export la fonction
module.exports = {
    // Sélectionne depuis la bdd les données de l'utilisateur avec l'adresse mail correspondant
    async findUser(email) {
        const result = await client.query(`
            SELECT *
                FROM "user"
                    WHERE email=$1`,
                    [email]
        );

        // Renvoit ces données 
        return result.rows[0];
    }, 
}
