/* ! PAS ENCORE UTILISÉ */

// On récupère le package "jsonwebtoken" qui permet d'implémenter les JSON Web Tokens pour envoyer des infos qui peuvent
// être vérifiées grâce à une signature digitale faite côté serveur
const jsonwebtoken = require('jsonwebtoken');
// On récupère aussi le module "nodemailer" qui permet d'envoyer des emails
const nodemailer = require('nodemailer');

// On importe la fonction du fichier passwordResetDataMapper
const { findUser } = require('../dataMappers/passwordResetDataMapper');

// On export notre fonction
module.exports = {
    // Récupère l'adresse mail de l'utilisateur à qui envoyer l'email et renvoit ....
    async createNewPassword (request, response) {
        // On récupère l'adresse mail de l'utilisateur 
        const { email } = request.body;

        // Si on ne récupère pas d'adresse mail, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
        // la requête demandée (404)     
        if (!email) {
            next();
        };
        console.error(email);

        // Envoi de l'adresse mail à la fonction 'findUser' du dataMapper et récupère les infos de l'utilisateur avec cette adresse
        const user = await findUser(email);
        console.log('user: ', user);
        
        // Si on ne récupère pas d'utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
        // la requête demandée (404)  
        if (!user) {
            next();
    
        } else {
            // Sinon, on extrait les données de l'utilisateur stockées en base de données
            const userData = {
                user
            };
            
            // Génère un token qui dure 30 minutes
            const accessToken = jsonwebtoken.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m',  algorithm: 'HS256' });

            console.log('email: ', user.email);
            console.log('password: ', user.password);

            // On crée un objet transporter pour pouvoir envoyer un email
            const transporter = nodemailer.createTransport({
                // On veut utiliser le service Gmail
                service: 'gmail',
                // On précise qu'il faut une adresse mail et son mote de passe pour s'authentifier
                auth: {
                    user: `${user.email}`,
                    pass: `${user.password}`
                },
            });

            // On configure le message
            const mailOptions = {
                // On indique que c'est l'adresse mail d'O'Medocs qui envoi le message
                from: 'o.medocs11@gmail.com',
                // Le receveur correspond à l'adresse mail récupérée en request.body
                to: `${user.email}`,
                // Le sujet du message
                subject: 'Connexion à O\'Medocs',
                // Le contenu du message (qui contient le token fraîchement créé)
                text:
                    'Nous vous avons envoyé cet e-mail pour vous aider à vous connecter à votre compte O\'Medocs.\n\n'
                    + 'Si vous n\'avez pas essayé de vous connecter à votre compte ou si vous n\'avez pas demandé cet e-mail, pas de panique.\n\n'
                    + 'Votre adresse e-mail a peut-être été entrée par oreur. Vous pouvez simplement ignorer ou supprimer cet e-mail, et utiliser votre mot de passe existant pour vous connecter.\n\n'
                    + `http://localhost:3020/reset/${accessToken}\n\n`,
            };
            console.log('sending mail');

            // Envoi l'email avec l'objet de transport défini
            transporter.sendMail(mailOptions, (error, response) => {
                // S'il y a une erreur, on la renvoit
                if (error) {
                    console.error('there was an error: ', error);
                }
                // Sinon, on envoit au front la réponse
                else {
                    console.log('here is the response: ', response);
                    response.status(200).json('recovery email sent');
                }
            });
        }
    },
}
