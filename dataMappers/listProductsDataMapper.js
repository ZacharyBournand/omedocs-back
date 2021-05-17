// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Sélectionne depuis la bdd les données du/des médicament(s) contenant le nom envoyé et les données de son/leur vendeur 
    async findProductsByName(name) {
        const result = await client.query(`
            SELECT *
                FROM "user"
            JOIN product
                ON product.user_id = "user".id
            WHERE product.name ILIKE $1`,
            [`${name}%`]
        );

        // Renvoit ces données 
        return result.rows;
    },
    
    // Sélectionne depuis la bdd les données du/des médicament(s) contenant le code CIS envoyé et les données de son/leur vendeur 
    async findProductsByCis(cis) {
        const result = await client.query(`
            SELECT *
                FROM "user"
            JOIN product
                ON product.user_id = "user".id
            WHERE product.cis_code ILIKE $1`,
            [`${cis}%`]
        );

        // Renvoit ces données 
        return result.rows;
    }
}
