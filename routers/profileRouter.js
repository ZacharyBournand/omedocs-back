// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère l'inventaire d'un vendeur
const profileController = require('../controllers/profileController');

// Route pour modifier l'email de l'utilisateur
router.patch('/editmail/:userId', authToken, profileController.editEmail);
// Route pour modifier le numéro de téléphone de l'utilisateur
router.patch('/editphone/:userId', authToken, profileController.editPhoneNumber);

// Export la constante 'router'
module.exports = router; 