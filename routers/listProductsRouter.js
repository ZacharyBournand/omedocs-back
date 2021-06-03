// Récupère Express
// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère l'inventaire d'un vendeur
const listProductsController = require('../controllers/listProductsController');

// Route pour lister le/les médicament(s) par nom
router.get('/productsbyname', authToken, listProductsController.getProductsByName);
// Route pour lister le/les médicament(s) par code CIS (code unique à chaque organisme médical)
router.get('/productsbycis', authToken, listProductsController.getProductsByCis);

// Export la constante 'router'
module.exports = router; 