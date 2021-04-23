// Récupère Express
const express = require('express');

// Importe le controller qui  
const inventoryController = require('../controllers/inventoryController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// On crée une route pour ajouter un médicament à l'inventaire du vendeur
router.post('/addProduct', inventoryController.createProduct);
// Récupère l'inventaire du vendeur
router.get('/inventory/:userId', inventoryController.getInventory);

// Export la constante 'router'
module.exports = router; 