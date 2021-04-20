// On récupère 'dotenv' et on le configure. Il nous permet de charger les variables d'environnement du fichier '.env'
require('dotenv').config();
// On récupère 'express' qui est un framework pour faciliter le codage en Node.js
const express = require('express');
// On récupère le package cors qui nous donne un middleware permettant d'activer le CORS avec plusieurs options à utiliser si besoin
const cors = require('cors');

// On importe le router
const router = require('./routers');


const app = express();

// On utilise le package cors qui active le CORS pour permettre à un domaine extérieur (côté front) d'accéder aux ressources 
// du domaine utilisé par cette API
app.use(cors({
    // Permet à l'URL donné de pouvoir accéder à l'API
    origin: '*',
}));

// On utilise un middleware intégré qui reconnaît les requêtes sous forme JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// on demande à express d'utiliser le routeur que l'on a configuré dans le fichier router.js
app.use(router);

// Je demande dans mon application à récupérer une variable d'environnement pour déterminer quel port utiliser pour express
// si on ne me donne aucune variable PORT dans l'environnement alors je prend la valeur 3000 
app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled server running on :', process.env.PORT);
});