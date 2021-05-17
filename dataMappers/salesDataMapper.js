// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données de la commande contenant des produits vendus par l'utilisateur
    async findSales(user_id) {
        const result = await client.query(`
            SELECT *
                FROM "order" 
                    WHERE seller_id = $1`,
                    [user_id]
        );
 
        // Renvoit ces données 
        return result.rows;
    },

    // Met à jour le statut de livraison de la commande et sélectionne (avec "RETURNING *") ses infos  
    async updateOrderStatus(status, orderNumber) {
        const result = await client.query(`
            UPDATE "order"
                SET status=$1
                    WHERE order_number=$2
            RETURNING *`,
            [status, orderNumber]
        );

        // Renvoit ces données 
        return result.rows[0];
    }
}