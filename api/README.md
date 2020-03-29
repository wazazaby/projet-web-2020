# Back-end de notre projet web

## Lancement de l'API :
* Se placer dans /api
* npm run dev

## Initialisation de la BDD :
* renommer le fichier env_copy en .env, et remplacer les valeurs par les valeur de votre DB

## Structure de l'API :
* server.ts => initialise le serveur, la BDD ainsi que toutes les routes de l'API. Chaque module aura ses propres routes.
Exemple d'import et d'utilisation de route (app étant l'instanciation de Koa) : 

```javascript
import monRouter from './ORM/Module/module.routes';

app.use(monRouter.routes());
app.use(monRouter.allowedMethods());
``` 

* Db.ts => donne l'accès à un Pool de connexion à la BDD. Voici comment utiliser le module :

```javascript
import { Db } from '../../../OCFram/Db';

Db.pool.query(...);
```

La propriété pool represente la connexion.

Structuration des dossiers, et ce qu'ils doivent contenir :
* ORM (dossier principal)
    * Module (nom de l'entité => User, Garment, Outfit par exemple, première lettre en majuscule)
        * Entity => ne doit contenir QU'UN seul fichier (nommé avec le nom du module, première lettre en majuscule) qui contient la définition de la Classe principale du module (membres de classes, setters, getters) 
        * Manager => ne doit contenir QU'UN seul fichier (nommé avec Manager + nom du module en CamelCase) qui contient toutes les méthodes en rapport avec le module (insert, vérification, mise à jour)
        * Controller => contient un fichier par action (nommé par le nom de l'action en anglais en CamelCase => CreateAccount, Authentification, UpateAccount) qui contiendra la logique de l'action
        * les routes => contiendra toutes les routes du module, chaque route devra appeller un Controller pour garder le contenu des routes le plus clair possible, par exemple :
        ```javascript
        router.post(`/api/module/action`, async (ctx: Context): Promise<void> => {
            const action: MonAction = new MonAction(ctx);
            await action.getResult();
        });
        ```