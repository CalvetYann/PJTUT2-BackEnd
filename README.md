# PJTUT2-BackEnd
Repo BackEnd - ProjetTut Breuil Calvet Idlbi Zouache

# SOMMAIRE
1. Présentation
2. Pré-requis
3. Installation
4. Démarrage du server
5. Détails


## Présentation 

Ce projet est la partie server qui permet de gérer les intéractions avec la base de données d'une l'application de gestion d'un cabinet d'avocats

## Pré-requis 

* IDE ( VScode, Webstorm etc...)
* WAMP / XAMP
* Node JS v.16+
* NPM


## Installation du projet

* Cloner le projet grâce au lien suivant : `https://github.com/CalvetYann/PJTUT2-BackEnd.git`
* Lancer le projet dans votre IDE favoris
* Dans votre terminal lancez la commande : `npm install`

## Mise en place de la base de données et du jeu de données

* Vous trouverez à la racine du projet un fichier `lawfirm.sql`
* Dans votre `phpMyAdmin` créez une nouvelle table ``lawfirm`
* Importez ensuite le fichier `lawfirm.sql`

La base de données est maintenant utilisable, et le jeu de données est en place ! 

## Démarrage du server 

* Dans votre terminal entrez la commande suivante : `node server.js`
* Si le processur s'est déroulé avec succès vous aurez le message suivant : `Server is running on port 8080`.

### Détails 

* Si vous souhaitez utiliser une base de donnée vide, il vous faudra retirer les commentaires dans le fichier `server.js` : 
     `db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });`
    
    
