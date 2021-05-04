/* ! Pas encore utilisé */

// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données des utilisateurs
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
