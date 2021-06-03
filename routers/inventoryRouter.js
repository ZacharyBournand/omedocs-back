// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère l'inventaire d'un vendeur
const inventoryController = require('../controllers/inventoryController');

// On crée une route pour ajouter un médicament à l'inventaire du vendeur
router.post('/addProduct', authToken, inventoryController.createProduct);
// Récupère l'inventaire du vendeur
router.get('/inventory/:userId', authToken, inventoryController.getInventory);

// Export la constante 'router'
module.exports = router; 