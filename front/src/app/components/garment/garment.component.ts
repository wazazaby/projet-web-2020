import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// liste des interfaces
import {  UserInterface, GarmentInterface, SeasonInterface, TypeInterface,
    GarmentColorStyleWrapperInterface, ColorInterface, StyleInterface, ErrorInterface } from '@osmo6/models';

// Liste des services
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';

// Liste des modals
import { ModalAddGarmentComponent } from './modal-add-garment/modal-add-garment.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-garment',
    templateUrl: './garment.component.html',
    styleUrls: ['./garment.component.scss']
})
export class GarmentComponent implements OnInit {

    // User
    user: UserInterface = this.stateService.userProfil;

    // Liste des vêtements
    garment: GarmentColorStyleWrapperInterface[] = this.stateService.garment;
    // Liste: saison, type, couleurs, style
    season: SeasonInterface[] = this.stateService.season;
    type: TypeInterface[] = this.stateService.type;
    color: ColorInterface[] = this.stateService.color;
    style: StyleInterface[] = this.stateService.style;

    // Liste des filtres
    filterName = [];
    // Ensemble des filtres
    allFilter = [];
    filterSelect = [];

    constructor(private stateService: StatesService,
                private bridgeService: BridgeService,
                public dialog: MatDialog) { }

    ngOnInit() {
        const seasonToString = [];
        const typeToString = [];
        const colorToString = [];
        const styleToString = [];
        const valueToStyle = [
            { label: 'Plus recent', active: false, type: 'ASC' },
            { label: 'Plus ancien', active: false, type: 'DESC' },
        ];

        this.season.forEach(s => {
            seasonToString.push({label: s.label_season, active: false, id: s.id_season, type: 'season'});
        });

        this.type.forEach(t => {
            typeToString.push({label: t.label_type, active: false, id: t.id_type, type: 'type'});
        });

        this.color.forEach(c => {
            colorToString.push({label: c.label_color, hex: c.hex_color, active: false , id: c.id_color, type: 'color'});
        });

        this.style.forEach(s => {
            styleToString.push({label: s.label_style, active: false, id: s.id_style, type: 'style'});
        });

       /**
        * Liste des filtres
        */
        this.filterName = [
            {id: 1, title: 'Trier par', value: valueToStyle, active: false},
            {id: 2, title: 'Types', value: typeToString, active: false},
            {id: 3, title: 'Styles', value: styleToString, active: false},
            {id: 4, title: 'Saisons', value: seasonToString, active: false},
            {id: 5, title: 'Couleur', value: colorToString, active: false},
        ];

        // Fusionne tout les filtres ensemble
        this.allFilter = [].concat(valueToStyle, typeToString, styleToString, seasonToString, colorToString);

        // On charge tout les vêtements utilisateur à l'init
        if (this.user) {
            // Envoie une requete pour recup les garments du user

            if (this.garment.length === 0) {
                this.bridgeService.getGarmentUser(this.user.id_user);
            }
           /**
            * Permet de récuperé les Garments stocker dans l'application
            * (écoute l'observable {garmentAsObservable()} et permet de rafraichir les data si un nouvelle item est ajouter)
            */
            this.stateService.garmentAsObservable().subscribe(res => {
                this.garment = res;
                this.stateService.orderArray(this.garment, 'garment', 'creation_date_garment', 'ASC');
            });
        }
    }

    // ------------------ Filtre ------------------
    // Permet d'activer le filtre selectionner
    openFilter(id: number, bool: boolean) {
        this.filterName.forEach(f => {
            if (f.id === id) {
                f.active = !f.active;
            } else {
                f.active = false;
            }
        });
    }

    // Permet de refresh les vêtemens en fonction du filtre choisi
    filter(val: {label: string, hex?: string, active: boolean}) {
        this.allFilter.forEach(f => {
            if (val.label === 'Plus ancien' && f.label === 'Plus recent') {
                if (f.active) {
                    f.active = false;
                    this.removeItem(f);
                }
            } else if (val.label === 'Plus recent' && f.label === 'Plus ancien') {
                if (f.active) {
                    f.active = false;
                    this.removeItem(f);
                }
            }

            if (val.label === f.label) {
                f.active = !f.active;
            }
        });

        const isExit = this.filterSelect.find(fi =>  val.label === fi.label);
        if (!isExit) {
            this.filterSelect.push(val);
        } else {
            this.removeItem(val);
        }

        this.activeFilter(this.filterSelect);
    }

   /**
    * Permet de supprimer un item du tableau des filtres
    * @param val: object
    */
    removeItem(val) {
        let x = 0;
        this.filterSelect.forEach(fi => {
            if (fi.label === val.label) {
                this.filterSelect.splice(x, 1);
            }
            x++;
        });
    }

    // Ferme tout les filtres
    resetFilter() {
        this.filterName.forEach(f => {
            f.active = false;
        });
    }

   /**
    * Permet de filtrer le tableau des vêtements
    * @param arr: []
    */
    async activeFilter(filter: any) {
        this.stateService.garmentAsObservable().subscribe(res => {
            // Liste des vêtements stocker dans l'app
            const garmentRes: GarmentColorStyleWrapperInterface[]  = res;
            // Liste des vêtements: pas encore filtrer croisée
            let tmpGarment: GarmentColorStyleWrapperInterface[] = [];
            // Liste des vêtements final (filtrer sa mere)
            let saveGarment: GarmentColorStyleWrapperInterface[] = [];
            // Liste des filtres utiliser
            const filterUse = {season: false, type: false, style: false, color: false};

            // Ordre du filtre
            let ascFilter: string = 'ASC'; // tslint:disable-line

            if (filter.length !== 0) {
                saveGarment = [];
                filter.forEach(f => {
                    // Pour chaque vêtement on répartie suivant les filtres utiliser
                    garmentRes.forEach(g => {
                        switch (f.type) {
                            case 'season':
                            filterUse.season = true;
                            if (g.garment.season_id_season === f.id) {
                                if (!tmpGarment.find(x => x.garment.id_garment === g.garment.id_garment)) {
                                    tmpGarment.push(g);
                                }
                            }
                            break;
                            case 'type':
                            filterUse.type = true;
                            if (g.garment.type_id_type === f.id) {
                                if (!tmpGarment.find(x => x.garment.id_garment === g.garment.id_garment)) {
                                    tmpGarment.push(g);
                                }
                            }
                            break;
                            case 'style':
                            filterUse.style = true;
                            g.styles.forEach(s => {
                                if (!tmpGarment.find(x => x.garment.id_garment === g.garment.id_garment)) {
                                    tmpGarment.push(g);
                                }
                            });
                            break;
                            case 'color':
                            filterUse.color = true;
                            g.colors.forEach(s => {
                                if (s.id_color === f.id) {
                                    if (!tmpGarment.find(x => x.garment.id_garment === g.garment.id_garment)) {
                                        tmpGarment.push(g);
                                    }
                                }
                            });
                            break;
                            case 'ASC':
                            ascFilter = 'ASC';
                            tmpGarment = garmentRes;
                            break;
                            case 'DESC':
                            ascFilter = 'DESC';
                            tmpGarment = garmentRes;
                            break;
                        }
                    });
                });

                // Pour chaque vêtements on croise les filtres
                tmpGarment.forEach(g => {
                    // On attribut les filtres utiliser
                    let seasonFound = !filterUse.season;
                    let typeFound = !filterUse.type;
                    let styleFound = !filterUse.style;
                    let colorFound = !filterUse.color;

                    filter.forEach(f => {
                        if (filterUse.season) {
                            if (f.type === 'season' && g.garment.season_id_season === f.id) {
                                seasonFound = true;
                            }
                        }

                        if (filterUse.type) {
                            if (f.type === 'type' && g.garment.type_id_type === f.id) {
                                typeFound = true;
                            }
                        }

                        if (filterUse.style) {
                            g.styles.forEach(s => {
                                if (f.type === 'style' && s.id_style === f.id) {
                                    styleFound = true;
                                }
                            });
                        }

                        if (filterUse.color) {
                            g.colors.forEach(c => {
                                if (f.type === 'color' && c.id_color === f.id) {
                                    colorFound = true;
                                }
                            });
                        }
                    });

                    if (seasonFound && typeFound && styleFound && colorFound) {
                        saveGarment.push(g);
                    }
                });
            } else {
                saveGarment = garmentRes;
            }

            this.stateService.orderArray(saveGarment, 'garment', 'creation_date_garment', ascFilter);
            this.garment = saveGarment;
        });
    }

    // ------------------ Filtre ------------------

    // Ouvre un modal pour ajouter un vêtement
    addGarment(): void {
        console.log('Ajouter vêtement');
        if (this.user) {
            const dialogRef = this.dialog.open(ModalAddGarmentComponent, {
                width: '60%',
                data: {userId: this.user.id_user}
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed', result);
            });
        }
    }

    removeGarment(garment: GarmentColorStyleWrapperInterface) {
        const dialogRef = this.dialog.open(ModalConfirmComponent, {
            width: '60%'
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.bridgeService.deleteGarmentReq(garment).subscribe(response => {
                    if (this.stateService.checkStatus(response.status)) {
                        this.stateService.openSnackBar('Votre vêtement a bien été supprimé', null);
                    } else {
                        const err: ErrorInterface = {
                            code: response.status,
                            message: response.message,
                            route: environment.apiUrl + '/api/user/' +
                                garment.garment.user_id_user + '/garment/delete/' + garment.garment.id_garment
                        };

                        this.stateService.errors = err;
                        this.stateService.openSnackBar(
                            'Une erreur s\'est produit, votre vêtement n\'a pas pu être supprimé',
                            null
                        );
                    }
                });
            }
        });
    }

    getImgSeason(n: number) {
        switch (n) {
            case 1:
            // hiver
            return '<i class="fas fa-snowflake"></i>';
            case 2:
            // Printemps
            return '<i class="fas fa-cloud-sun"></i>';
            case 3:
            // Ete
            return '<i class="fas fa-sun"></i>';
            case 4:
            // Automne autumn
            return '<i class="fas fa-mountain"></i>';
        }
    }

   /**
    * Action au hover d'une image
    * @param num: number (0->supprimer, 1->modifier)
    * @param garment: GarmentInterface
    */
    actToGarment(num: number, garment: GarmentColorStyleWrapperInterface) {
        if (num === 0) {
            // supprimer
            this.removeGarment(garment);
        } else {
            // modifier
            console.log('modifier');
            console.log(garment);
        }
    }
}
