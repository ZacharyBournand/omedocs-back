// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère les paiements via Stripe
const stripeController = require('../controllers/stripeController');

// Route qui renvoit la clé Stripe au front
router.get('/', stripeController.sendStripeKey);
// Route qui initialise l'instance de paiement
router.post('/checkout', authToken, stripeController.initializePaymentInstance);

// Export la constante 'router'
module.exports = router;