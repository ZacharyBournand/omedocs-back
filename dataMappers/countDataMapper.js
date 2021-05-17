// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd le nombre d'utilisateurs classés par type d'usage (acheteur ou vendeur)
    async countUsers() {
        const result = await client.query(`
            SELECT user_type, COUNT("user".id)
                FROM "user"
            GROUP BY user_type`   
        );

        // Renvoit ces données
        return result.rows;
    },

    // Sélectionne depuis la bdd le nombre de médicaments 
    async countProducts() {
        const result = await client.query(`
            SELECT COUNT(product.id)
                FROM product`
        );

        // Renvoit ces données
        return result.rows[0];
    }
}
