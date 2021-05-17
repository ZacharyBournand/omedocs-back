// Récupère Express
const express = require('express');
// On récupère un module qui nous apporte un middleware de validation des JSON Web Tokens
const jwt = require('express-jwt');

// Importe le controller qui nous donne le nombre d'acheteurs, de vendeurs et de médicaments
const countController = require('../controllers/countController');

// On déclare le middleware jwt configuré avec le secret qui encode les tokens et l'algorithme à utiliser pour décoder les tokens générés
const authMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route qui liste le nombre d'acheteurs, de vendeurs et de médicaments
router.get('/count', authMiddleware, countController.getCount);

// Export la constante 'router'
module.exports = router; 