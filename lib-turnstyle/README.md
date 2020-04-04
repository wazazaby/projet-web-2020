# Setup de la librairie
## Install des paquets
npm i (dans la lib)

## Build
npm run build:models

## Install
npm i ../lib-turnstyle/dist/osmo6/models/osmo6-models-0.0.1.tgz

## Import
import { ExampleModels, NomModel, TestModel } from '@osmo6/models

## Usage
* Créer un fichier au model: NameModel.ts
* Ajouter ce fichier dans /projects/models/src/lib/
* Ajouter l'export dans public-api.ts: export * from './lib/RouteModel';
* Go build
