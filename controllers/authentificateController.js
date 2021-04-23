// Charge les variables d'environnement du fichier '.env'
require('dotenv').config();
// On rcupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
exports.authorizationMiddleware =  jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

