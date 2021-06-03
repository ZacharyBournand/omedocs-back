// Récupère le router d'Express
const router = require('express').Router();

// Importe le controller qui gère l'inscription et la connexion d'un utilisateur 
const connectController = require('../controllers/connectController');


// On crée une route pour l'inscription et une autre pour la connexion d'un utilisateur
router.post('/signup', connectController.signup);
router.post('/login', connectController.login); 

// Export la constante 'router'
module.exports = router; 