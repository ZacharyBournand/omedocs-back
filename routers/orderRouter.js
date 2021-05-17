// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui gère les commandes d'un utilisateur
const orderController = require('../controllers/orderController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route pour créer une commande
router.post('/saveOrder/:userId', authMiddleware, orderController.createOrder);
// Route pour récupérer l'historique de commandes d'un utilisateur
router.get('/orders/:userId', authMiddleware, orderController.getOrders);

// Export la constante 'router'
module.exports = router; 
