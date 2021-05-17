/* ! PAS ENCORE UTILISÉ */

// Récupère Express
const express = require('express');

// Importe le controller qui permet à l'utilisateur de réinitialiser son mot de passe
const passwordResetController = require('../controllers/passwordResetController');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Route qui réinitialise le mot de passe de l'utilisateur
router.post('/forgotPassword', passwordResetController.createNewPassword);

// Export la constante 'router'
module.exports = router; 