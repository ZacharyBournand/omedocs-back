/* ! PAS ENCORE UTILISÉ */

// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui permet à l'utilisateur de réinitialiser son mot de passe
const passwordResetController = require('../controllers/passwordResetController');

// Route qui réinitialise le mot de passe de l'utilisateur
router.post('/forgotPassword', authToken,  passwordResetController.createNewPassword);

// Export la constante 'router'
module.exports = router; 