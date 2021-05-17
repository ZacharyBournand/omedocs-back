// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Supprime et sélectionne (avec "RETURNING") un produit de l'inventaire du vendeur
    async deleteProduct(id) {
        const result = await client.query(`
            DELETE FROM product
                WHERE id=$1
            RETURNING *`,
            [id]
        );

        // Renvoit ces données 
        return result.rows[0];
    },

    // Met à jour la quantité disponible du produit dans l'inventaire du vendeur et sélectionne ce produit (avec "RETURNING")
    async updateProduct(quantity, id) {
        const result = await client.query(`
            UPDATE product
                SET quantity=$1
                    WHERE id=$2
            RETURNING *`,
            [quantity, id]
        );
 
        // Renvoit ces données 
        return result.rows[0];
    },
}