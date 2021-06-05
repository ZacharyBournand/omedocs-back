// On récupère le package 'jsonwebtoken' qui permet d'implémenter les JSON Web Tokens pour envoyer des infos qui peuvent
// être vérifiées grâce à une signature digitale faite côté serveur
const jsonwebtoken = require('jsonwebtoken');
// On importe les fonctions du fichier connectDataMapper
const { insertUser, findUserByEmail } = require('../dataMappers/connectDataMapper');
// On récupère la librairie bcrypt qui permet de hasher les mots de passe
const bcrypt = require('bcrypt');

// Librairie qui check si un email est valide
const emailValidator = require('email-validator')

// Librairie qui teste la force d'un mot de passe
const { passwordStrength } = require('check-password-strength')

// Je personnalise les options de la librairie 'check-password-strength'
const customOptions = [
  {
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: "Weak",
    minDiversity: 2,
    minLength: 6
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 3,
    minLength: 8
  }

]

// On export nos fonctions
module.exports = {    
    // Récupère et renvoit sous format JSON les informations du nouvel utilisateur qui s'est inscrit
    async signup (request, response, next) {
        try {
            // Récupère les données à insérer en base de données
            const { user_type, establishment, rpps, finess, adeli, email, password, phone_number, address, city, region, zip_code } = request.body;

        // Je vérifie que l'email sois valide
            if(!emailValidator.validate(email)) {
               return  response.status(401).json({
                error: {
                    message: "Unauthorized_email",
                    messageDetail: "Le format de l'email est non valide"
            }
                })
                        }

            // Je teste la force du password avec mes customOptions passé en 2nd paramètre
            // checkPassword contient un objet qui contient les propriété du password (lenght, value, contains)
            const checkPassword = passwordStrength(password, customOptions)

            // Si le password ne respecte pas les conditions je renvoie une erreur
            if(checkPassword.length < 8) {
                return response.status(401).json({
                error: {
                   message: "Unauthorized_password",
                    messageDetail: "Le mot de passe doit contenir au moins 8 caractère"
                 }
             })
            }
            if(checkPassword.value !== "Medium") {
               return response.status(401).json({
                error: {
                   message: "Unauthorized_password",
                    messageDetail: "Le mot de passe doit répondre a au moins 3 de ces critères: minuscule, majuscule, nombre, caractère spécial"
                 }
             })
}

            // Hash le mot de passe
           const hashedPassword = await bcrypt.hash(password, 10);

            // Envoi les données à la fonction 'insertUser' du dataMapper et récupère son résultat
            const newUser = await insertUser (
                user_type,
                establishment,
                rpps,
                finess,
                adeli,
                email, 
                hashedPassword,
                phone_number,
                address,
                city, 
                region,
                zip_code
            );

            // Si on ne récupère pas de nouvel utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)
            if (!newUser) {
                next();
                
            } else {
                // Sinon, on envoit au front une réponse avec un statut de succès
                response.status(201).json({ newUser });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Lorsqu'un utilisateur essaye de se connecter, on vérifie que les données entrées sont valides
    async login (request, response, next) {
        try {            
            // Voir dans ma base de données si j'ai un utilisateur avec cet email
            const user = await findUserByEmail(request.body.emailConnexion);
        
            // Si aucun utilisateur a cet email, on renvoit une erreur d'authentification (401)
            if (!user) {
                response.status(401).json({
                    error: {
                        message: "authentification_error",
                        messageDetail: "Cet utilisateur n'existe pas"
                    }
                });
                return;

            // Sinon, je vérifie que le mot de passe haché qui est enregistré dans ma base de données correspond au mot de passe donnée 
            // par l'utilisateur
            } else if (await bcrypt.compare(request.body.passwordConnexion, user.password)) {

                // On retire le password avant de le renvoyer au front
                user.password = undefined

                // Génère un token qui servira a authentifié l'utilisateur
                const accessToken = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h',  algorithm: 'HS256' });

                // Renvoi notre token avec les infos de l'utilisateur au front
                response.status(200).json({ 
                    status: "success",
                    user, 
                    accessToken
                });

            // Si le mote de passe est incorrect, on renvoit une erreur d'authentification (401)
            } else {
                response.status(401).json({
                    error: {
                        message: "authentification_error",
                        messageDetail: "Mot de passe incorrect"
                    }
                });
            };        
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }, 
}; 