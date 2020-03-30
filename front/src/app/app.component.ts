import { Component, OnInit } from '@angular/core';
import { RouteModel } from './interfaces/route.interface';
import { Router } from '@angular/router';
import { StatesService } from './services/states.service';
import { BridgeService } from './services/bridge.service';
import { UserModel } from './interfaces/users.interface';

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
  sideBar: RouteModel[] = [
    {path: '', isActive: true, title: 'Accueil', icon: '<i class="fas fa-home"></i>'},
    {path: 'vetements', isActive: false, title: 'Ajouter vêtemens', icon: '<i class="fas fa-puzzle-piece"></i>'},
    {path: 'garde-robes', isActive: false, title: 'Garde robe', icon: '<i class="fas fa-plus"></i>'},
  ];

  // user: UserModel = null;
  user: UserModel = {
    id_user: 1,
    name_user: 'snow',
    email_user: 'snow@mail.com',
    actif_user: 1,
    img_user: 'assets/sn.jpg',
    rgpd_user: 1
  };

  constructor(private router: Router,
              private stateService: StatesService,
              private bridgeService: BridgeService) {}

  async ngOnInit() {
    // Aprés la connexion
    // this.user = await this.bridgeService.login();
    // On enregistre le USER dans l'etat de app
    this.stateService.userProfil = this.user;
  }

  /**
   * Permet de fermer/ouvrir la barre de navigation
   * @param e event: non obligatoire
   * @return boolean
   */
  collapse(e?: Event) {
    this.isCollapse = !this.isCollapse;
  }

  /**
   * Récupére les info de navigation au click de la barre de navigation
   * @param r RouteModel path/isActive/title/icon
   */
  navigation(r: RouteModel) {
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
