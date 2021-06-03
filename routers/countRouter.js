// Récupère le router d'Express
const router = require('express').Router();

// Middleware qui vérifie l'authenticité du token
const authToken = require('../middlewares/authToken');

// Importe le controller qui nous donne le nombre d'acheteurs, de vendeurs et de médicaments
const countController = require('../controllers/countController');


// Route qui liste le nombre d'acheteurs, de vendeurs et de médicaments
router.get('/count',authToken , countController.getCount);

// Export la constante 'router'
module.exports = router; 