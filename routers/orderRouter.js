// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère les commandes d'un utilisateur
const orderController = require('../controllers/orderController');

// Route pour créer une commande
router.post('/saveOrder/:userId', authToken, orderController.createOrder);
// Route pour récupérer l'historique de commandes d'un utilisateur
router.get('/orders/:userId', authToken, orderController.getOrders);

// Export la constante 'router'
module.exports = router; 
