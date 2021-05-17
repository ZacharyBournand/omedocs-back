// Récupère Express
const express = require('express');

// Importe les routers enfants
const connectRouter = require('./connectRouter');
const inventoryRouter = require('./inventoryRouter');
const listProductsRouter = require('./listProductsRouter');
const listEstablishmentsRouter = require('./listEstablishmentsRouter');
const editInventoryRouter = require('./editInventoryRouter');
const stripeRouter = require('./stripeRouter');
const profileRouter = require('./profileRouter');
const countRouter = require('./countRouter');
const orderRouter = require('./orderRouter');
const salesRouter = require('./salesRouter');
/* const passwordResetRouter = require('./passwordResetRouter'); */

// Importe le controller qui gère les erreurs
const errorsMiddlewares = require('../controllers/errorsMiddlewares');

// Permet de créer des nouveaux gestionnaires de routes pour manipuler les requêtes
const router = express.Router();

// Utilise les fichiers importés 
router.use(connectRouter);
router.use(inventoryRouter);
router.use(listProductsRouter);
router.use(listEstablishmentsRouter);
router.use(editInventoryRouter);
router.use(stripeRouter);
router.use(profileRouter);
router.use(countRouter);
router.use(orderRouter);
router.use(salesRouter);
/* router.use(passwordResetRouter); */

// S'il y a une erreur 404, on arrivera a ce middleware qui gère ce type d'erreur
router.use(errorsMiddlewares.error404);
// S'il y a une erreur 500, on arrivera a ce middleware qui gère ce type d'erreur
router.use(errorsMiddlewares.error500);

// Export la constante 'router' qui utilise le fichier connectRouter
module.exports = router;