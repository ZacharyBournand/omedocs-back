// On récupère un pool de clients PostgreSQL (plusieurs clients pg).
// Cela permet d'éviter un temps de réponse long car un répartiteur va distribuer les requêtes aux clients non occupés
const { Pool } = require('pg');

// Créer une nouvelle connexion à la base de données Lakebase Postgres (Neon) en utilisant l'URL poolée DATABASE_URL
// (ou DATABASE_URL_UNPOOLED en secours)
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;

const client = new Pool({
    connectionString,
    // SSL (Secure Sockets Layer) crypte les communications client/serveur entre Node.js et PostgreSQL
    ssl: {
        rejectUnauthorized: false
    }
});

// Évite qu'une déconnexion d'un client inactif (ex: scale-to-zero de Neon) ne fasse planter le processus Node.js
client.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL pool client:', err.message);
});

// On export les nouvelles connexions faites à notre base de données
module.exports = client;
