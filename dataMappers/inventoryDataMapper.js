// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {

    // Insère les données du médicament ajouté par un vendeur dans la base de données 
    async insertProduct(name, expiration, quantity, price, cis, user_id) {
        const result = await client.query(`
            INSERT INTO product (name, expiration_date, quantity, unit_price, cis_code, user_id)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [name, expiration, quantity, price, cis, user_id]
        );
            
        // Renvoit ces données 
        return result.rows;
    },

    async findUserInventory(user_id) {
        const result = await client.query(`
            SELECT *
            FROM product 
            WHERE user_id = $1`,
            [user_id]
        );

        // Renvoit ces données 
        return result.rows;
    },

}