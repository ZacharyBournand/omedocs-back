// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui gère la liste de l'/des organisme(s) demandé(s)
const listEstablishmentsController = require('../controllers/listEstablishmentsController');


// On crée une route pour lister l'/les organisme(s) demandé(s)
router.get('/searchestablishments', authToken, listEstablishmentsController.getsListEstablishments);

// Export la constante 'router'
module.exports = router; 