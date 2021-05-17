// On récupère un pool de clients PostgreSQL (plusieurs clients pg).
// Cela permet d'éviter un temps de réponse long car un répartiteur va distribuer les requêtes aux clients non occupés
const { Pool } = require('pg');

// Créer une nouvelle connexion à la base de données en créant un nouvel objet Pool avec l'URL de notre base de données 
// (stocké dans la variable DATABASE_URL)
const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    // SSL (Secure Sockets Layer) crypte les communications client/serveur entre Node.js et PostgreSQL pour améliorer la sécurité
    ssl: {
        // On ne vérifie pas l'identité du serveur 
        rejectUnauthorized: false
    }
});

// On export les nouvelles connexions faites à notre base de données
module.exports = client;
