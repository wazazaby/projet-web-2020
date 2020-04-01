# Build
ng build

# Install
npm i ../lib-turnstyle/dist/osmo6/models

# Import
import { ExampleModels, NomModel, TestModel } from '@osmo6/models

# Usage

* Créer un fichier au model: NameModel.ts
* Ajouter ce fichier dans /projects/models/serc/lib/
* Ajouter l'export dans public-api.ts: export * from './lib/RouteModel';
* Go build