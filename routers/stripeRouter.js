// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui gère les paiements via Stripe
const stripeController = require('../controllers/stripeController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route qui renvoit la clé Stripe au front
router.get('/', stripeController.sendStripeKey);
// Route qui initialise l'instance de paiement
router.post('/checkout', authMiddleware, stripeController.initializePaymentInstance);

// Export la constante 'router'
module.exports = router; 