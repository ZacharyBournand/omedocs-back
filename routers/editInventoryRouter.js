// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère l'inventaire d'un vendeur
const inventoryController = require('../controllers/editInventoryController');

// Route qui supprime un médicament de l'inventaire du vendeur
router.delete('/deleteProduct/:productId', authToken, inventoryController.removeProduct);
// Route qui modifie la quantité d'un médicament dans l'inventaire du vendeur 
router.patch('/modifyProduct/:productId', authToken, inventoryController.modifyProduct);

// Export la constante 'router'
module.exports = router; 