# Scriptura

Scriptura est un système de gestion de bibliothèque qui permet de gérer des collections de livres numériques. Il offre des fonctionnalités telles que l'ajout de livres, l'importation en masse, la liste avec recherche et filtres, la suppression, la mise à jour, et la création de recueils.

## Prérequis
- Node.js (version recommandée: 16.x)
- Docker (pour l'installation via Docker)
- Docker Compose (pour orchestrer les conteneurs Docker)

## Installation en local
#### Clonez le dépôt Git :

```bash
git clone git@github.com:davidfradel/scriptura.git
cd scriptura
```
#### Installez les dépendances pour chaque service :
```bash
cd express-server
npm install

cd ../fastify-server
npm install

cd ../guardian
npm install
```
Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine locale.

Configurez la connexion à MongoDB dans le dossier config/db.js

Démarrez les serveurs :

```bash
# Dans le dossier express-server
npm start

# Dans un nouveau terminal, dans le dossier fastify-server
npm start
```

## Installation via Docker
Assurez-vous que Docker et Docker Compose sont installés sur votre machine.

Compiler le package local Guardian avant de lancer le build

```bash
# Dans le dossier guardian
npm install
npm run build
```

À la racine du projet, lancez les services avec Docker Compose :

```bash
docker-compose up --build
```

Cette commande construira les images Docker pour les services express-server, fastify-server et guardian, et démarrera les conteneurs, y compris un conteneur MongoDB.

### Utilisation
Une fois les serveurs démarrés, vous pouvez interagir avec l'API via les endpoints suivants :
- `POST /books`: Ajoute un livre.
- `POST /books/import`: Importe des livres en masse.
- `GET /books`: Liste les livres avec pagination et recherche/filtre.
- `DELETE /books/:id`: Supprime un livre par son identifiant.
- `PUT /books/:id`: Met à jour un livre par son identifiant.
- `GET /books/special`: Liste les livres d'une manière particulière (tri sur le contenu des pages).
- `POST /books/anthology`: Crée un recueil à partir d'une liste de livres.

Vous pouvez utiliser des outils comme curl, Postman ou tout autre client HTTP pour envoyer des requêtes à ces endpoints.

Aussi, un repository avec des scripts est à disposition à cette url https://github.com/davidfradel/booksscript
