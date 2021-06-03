// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère les ventes d'un vendeur
const salesController = require('../controllers/salesController');

// Route pour récupérer les ventes d'un utilisateur
router.get('/sales/:user_id', authToken, salesController.getSales);
// Route permettant au vendeur de modifier le statut d'une commande contenant ses produits vendus (pour notifier l'acheteur du statut de la livraison)
router.patch('/status/:orderNumber', authToken, salesController.editOrderStatus);

// Export la constante 'router'
module.exports = router; 