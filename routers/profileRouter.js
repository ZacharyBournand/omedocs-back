// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui gère l'inventaire d'un vendeur
const profileController = require('../controllers/profileController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route pour modifier l'email de l'utilisateur
router.patch('/editmail/:userId', authMiddleware, profileController.editEmail);
// Route pour modifier le numéro de téléphone de l'utilisateur
router.patch('/editphone/:userId', authMiddleware, profileController.editPhoneNumber);

// Export la constante 'router'
module.exports = router; 