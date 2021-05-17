// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Insère et sélectionne (avec "RETURNING") les données du médicament ajouté par un vendeur dans la base de données 
    async insertProduct(name, expiration, quantity, price, cis, user_id) {
        const result = await client.query(`
            INSERT INTO product (name, expiration_date, quantity, unit_price, cis_code, user_id)
                VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
                [name, expiration, quantity, price, cis, user_id]
        );
            
        // Renvoit ces données 
        return result.rows[0];
    },

    // Sélectionne depuis la bdd les données des médicaments dans l'inventaire du vendeur
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