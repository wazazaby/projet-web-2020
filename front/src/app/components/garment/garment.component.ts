import { Component, OnInit } from '@angular/core';

// liste des interfaces
import { UserInterface, GarmentInterface } from '@osmo6/models';

// Liste des services
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent implements OnInit {

  user: UserInterface = this.stateService.userProfil;
  garment: GarmentInterface[] = [];
  isCollapse: boolean = false; // tslint:disable-line

  filterName = [
    {id: 1, title: 'Trier par', value: ['Plus recent', 'Plus ancien'], active: true},
    {id: 2, title: 'Types', value: ['tshirt', 'pull', 'sweat'], active: false},
    {id: 3, title: 'Styles', value: ['sport', 'decontract'], active: false},
    {id: 4, title: 'Saisons', value: ['Hiver', 'Printemps', 'Été', 'Automne'], active: false},
    {id: 5, title: 'Couleur', value: ['#0ABAB5', '#000000'], active: false},
  ];

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService) { }

  ngOnInit() {
    // On charge tout les vêtements utilisateur à l'init
    this.garment = this.bridgeService.getGarmentUSer(this.user.id_user, 1);
  }

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

  // Ouvre le modal pour ajouter un vêtement
  addGarment() {
    console.log('Ajouter vêtement');
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
