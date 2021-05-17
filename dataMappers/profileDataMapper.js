// Récupère le pool de clients PostgreSQL
const client = require('./client'); 

// On export les fonctions
module.exports = {
    // Met à jour l'email de l'utilisateur et sélectionne (avec "RETURNING") son profil modifié
    async updateEmail(email, id) {
        const result = await client.query(`
            UPDATE "user"
                SET email=$1
                    WHERE id=$2
            RETURNING *`,
            [email, id]
        );
        
        // Renvoit ces données 
        return result.rows[0];
    },

    // Met à jour le numéro de téléphone de l'utilisateur et sélectionne (avec "RETURNING") son profil modifié
    async updatePhoneNumber(phoneNumber, id) {
        const result = await client.query(`
            UPDATE "user"
                SET phone_number=$1
                    WHERE id=$2
            RETURNING *`,
            [phoneNumber, id]
        );
       
        // Renvoit ces données 
        return result.rows[0];
    }
}
