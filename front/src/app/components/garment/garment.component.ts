import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// liste des interfaces
import { UserInterface, GarmentInterface } from '@osmo6/models';

// Liste des services
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';

// Liste des modals
import { ModalAddGarmentComponent } from './modal-add-garment/modal-add-garment.component';

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent implements OnInit {

  // User
  user: UserInterface = this.stateService.userProfil;

  // Liste des vêtements
  garment: GarmentInterface[] = [];

  season = this.stateService.season;

  // Liste des filtres
  filterName = [];

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService,
              public dialog: MatDialog) { }

  ngOnInit() {
    const seasonToString = [];
    this.season.forEach(s => {
      seasonToString.push(s.title);
    });
    this.filterName = [
      {id: 1, title: 'Trier par', value: ['Plus recent', 'Plus ancien'], active: false},
      {id: 2, title: 'Types', value: ['tshirt', 'pull', 'sweat'], active: false},
      {id: 3, title: 'Styles', value: ['sport', 'decontract'], active: false},
      {id: 4, title: 'Saisons', value: seasonToString, active: false},
      {id: 5, title: 'Couleur', value: [
        {label: 'cyan', hex: '#0ABAB5'},
        {label: 'black', hex: '#000000'}
      ], active: false},
    ];
    // On charge tout les vêtements utilisateur à l'init
    this.garment = this.bridgeService.getGarmentUSer(this.user.id_user, 1);
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
  filter(val) {
    console.log('Filtre', val);
  }

  // Ferme tout les filtres
  resetFilter() {
    this.filterName.forEach(f => {
      f.active = false;
    });
  }
  // ------------------ Filtre ------------------

  // Ouvre un modal pour ajouter un vêtement
  addGarment(): void {
    console.log('Ajouter vêtement');
    const dialogRef = this.dialog.open(ModalAddGarmentComponent, {
      width: '60%',
      data: {userId: this.user.id_user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  /**
   * Action au hover d'une image
   * @param num: number (0->supprimer, 1->modifier)
   * @param garment: GarmentInterface
   */
  actToGarment(num: number, garment: GarmentInterface) {
    if (num === 0) {
      // supprimer
      console.log('supprimer');
      console.log(garment);
    } else {
      // modifier
      console.log('modifier');
      console.log(garment);
    }
  }

}
