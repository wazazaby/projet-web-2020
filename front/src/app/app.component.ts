import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { StatesService } from './services/states.service';
import { BridgeService } from './services/bridge.service';

// interfaces/models
import { RouteInterface, UserInterface } from '@osmo6/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Valeur du hamburger (barre de navigation "responsive")
   */
  isCollapse: boolean = false; // tslint:disable-line

  /**
   * On ajoute les différentes route ici (génére la barre de navigation principal)
   */
  sideBar: RouteInterface[] = [
    {path: '', isActive: true, title: 'Accueil', icon: '<i class="fas fa-home"></i>'},
    {path: 'vetements', isActive: false, title: 'Vêtemens', icon: '<i class="fas fa-tshirt"></i>'},
    {path: 'garde-robes', isActive: false, title: 'Garde robe', icon: '<i class="fas fa-plus"></i>'},
  ];

  // user: UserModel = null;
  user: UserInterface = {
    id_user: 1,
    name_user: 'snow',
    email_user: 'snow@mail.com',
    actif_user: 1,
    img_user: 'assets/sn.jpg',
    rgpd_user: 1,
    pass_user: 'pass',
    token_user: 'token',
    creation_date_user: 1586849406,
    modification_date_user: 1586849406
  };

  constructor(private router: Router,
              private stateService: StatesService,
              private bridgeService: BridgeService) {}

  async ngOnInit() {
    // Aprés la connexion
    // this.user = await this.bridgeService.login();
    // On enregistre le USER dans l'etat de app
    this.stateService.userProfil = this.user;
    this.initApp();
  }

  async initApp() {
    this.bridgeService.getBrand();
    this.bridgeService.getSeason();
    this.bridgeService.getType();
  }

  /**
   * Permet de fermer/ouvrir la barre de navigation
   * event ou boolean pour fonctionner
   * @param e event: non obligatoire
   * @param b boolean: none obligatoire
   * @return boolean
   */
  collapse(e?: Event, b?: boolean): boolean {
    let bool = b || false;

    if (e && !bool) {
      if (e.type === 'mouseover') {
        bool = true;
      } else  {
        bool = false;
      }
      e.stopPropagation();
    }
    return this.isCollapse = bool;

  }

  /**
   * Récupére les info de navigation au click de la barre de navigation
   * @param r RouteModel path/isActive/title/icon
   */
  navigation(r: RouteInterface) {
    // console.log(r);
    this.sideBar.forEach(s => {
      if (s.path === r.path) {
        s.isActive = !s.isActive;
      } else {
        s.isActive = false;
      }
    });

    this.router.navigate([r.path]);
  }

}
