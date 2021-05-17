// Récupère le pool de clients PostgreSQL
const client = require('./client');

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les numéros de commande
    async selectOrderNumbers() {
        const result = await client.query(`
            SELECT order_number
                FROM "order"`
        );

        // S'il n'y en a pas, on revoit "undefined"
        if (result.rowCount === 0 ) {
            return undefined;
        };

        // Renvoit ces données
        return result.rows;
    },

    // Insère et sélectionne (avec "RETURNING *") les infos de la nouvelle commande
    async insertOrder(orderNumber, totalCost, buyerId, sellerId) {
        const result = await client.query(`
            INSERT INTO "order" (order_number, total_cost, buyer_id, seller_id)
                VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [orderNumber, totalCost, buyerId, sellerId]
        );

        // Renvoit ces données
        return result.rows[0];
    },

    // Sélectionne depuis la bdd les données de toutes les commandes faites par l'utilisateur
    async selectOrders(buyer_id) {
        const result = await client.query(`
            SELECT * 
                FROM "order"
                    WHERE buyer_id=$1`,
                    [buyer_id]
        );

        // Renvoit ces données
        return result.rows;
    }
}