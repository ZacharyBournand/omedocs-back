// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui gère l'inventaire d'un vendeur
const inventoryController = require('../controllers/editInventoryController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route qui supprime un médicament de l'inventaire du vendeur
router.delete('/deleteProduct/:productId', authMiddleware, inventoryController.removeProduct);
// Route qui modifie la quantité d'un médicament dans l'inventaire du vendeur 
router.patch('/modifyProduct/:productId', authMiddleware, inventoryController.modifyProduct);

// Export la constante 'router'
module.exports = router; 