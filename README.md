# projet-web-2020
Projet web 2020

# API
* npm run dev

# Front
* ng serve / ng s

==============================================================================
# Lib-osmo6

## Concept
La lib osmo6 permet de grouper les différents models utilisé dans l'API et le Front.
Cette lib nous permet de syncronisé nos models (class, interface ...) entre nos 2 applications, sans faire de copier coller.
exemple de model:
  * export class ColorModel {
    id_color?: number; // l'attribut ?: permet de définir un champ non obligatoire
      label_color: string; // ceci est un champ obligatoire
      hex_color: string;
      rgb_color: string;
    }

## Installation
* Etape 0 -> npm i ou npm install
* Etape 1 -> ng build
* Etape 2 -> cd ../nom-du-projet
* Etape 3 -> npm i ..\{chemin-de-la-lib}\lib-turnstyle\dist\osmo6\models
* Etape 4 -> import les models dont on à besoin

## Utilisation
Chacun des models sera formater de cet maniere :
* nom du fichier -> ExempleModel.ts (Pascal case)
* export class ExempleModel { attribute }