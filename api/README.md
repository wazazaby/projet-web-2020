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

Structuration des dossiers, et ce qu'ils doivent contenir (dans ORM) :
* Module (nom de l'entité => User, Garment, Outfit par exemple, première lettre en majuscule)
    * ModuleEntity => contient la définition de la Classe principale du module (membres de classes, setters, getters) 
    * ModuleManager => contient toutes les méthodes en rapport avec le module (insert, vérification, mise à jour)
    * ModuleController => contient la logique de chaque action
    * ModuleRoutes => contiendra toutes les routes du module. Instancier le controller en rapport en haut, et appeler l'action dans la route
    ```javascript
    const controller: MonController = new MonController();
    router.post('/api/module/action', async (ctx: Context): Promise<void> => await controller.monAction(ctx));
    ```