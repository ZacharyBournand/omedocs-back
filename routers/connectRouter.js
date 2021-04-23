// Récupère Express
const express = require('express');

// Importe le controller qui gère l'inscription et la connexion d'un utilisateur 
const connectController = require('../controllers/connectController');
// On importe aussi un controller qui déclare un middleware pour valider les JSON Web Tokens
const authToken = require('../controllers/authentificateController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// On crée une route pour l'inscription et une autre pour la connexion d'un utilisateur
router.post('/signup', connectController.signup);
router.post('/login', connectController.login); 
/* router.get('/posts', authToken, connectController.getPosts); */

// Export la constante 'router'
module.exports = router; 