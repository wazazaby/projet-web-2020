import { Component, OnInit } from '@angular/core';
import { RouteInterface, UserInterface } from '@osmo6/models';
import { Router } from '@angular/router';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Valeur du hamburger (barre de navigation "responsive")
   */
  isCollapse: boolean = false; // tslint:disable-line

  /**
   * On ajoute les différentes route ici (génére la barre de navigation principal)
   */
  sideBar: RouteInterface[] = [
    {path: 'accueil', isActive: true, title: 'Accueil', icon: '<i class="fas fa-home"></i>'},
    {path: 'vetements', isActive: false, title: 'Vêtemens', icon: '<i class="fas fa-tshirt"></i>'},
    {path: 'garde-robes', isActive: false, title: 'Garde robe', icon: '<i class="fas fa-plus"></i>'}
  ];

  // user: UserModel = null;
  user: UserInterface = {
    id_user: 1,
    name_user: 'snow',
    email_user: 'snow@mail.com',
    actif_user: 1,
    url_img_user: 'assets/sn.jpg',
    rgpd_user: 1,
    pass_user: 'pass',
    token_user: 'token',
    creation_date_user: 1586849406,
    modification_date_user: 1586849406
  };

  // Permet de savoir si l'utilisateur est auth (gestion de router différent)
  isLoggedIn$: boolean;


  constructor(private router: Router,
              private stateService: StatesService) {}

  ngOnInit() {
    // Permet d'utiliser 2 router différents
    this.stateService.isLoggedIn().subscribe(b => {
      this.isLoggedIn$ = b;
    });

    console.log(this.stateService.userProfil);

    // Redirige l'utilisateur si pas connecter
    // todo géré les cas de refresh de la page
    // this.stateService.isLoggedIn.subscribe(res => {
    //   this.bridgeService.initData(!res);
    //   if (!res) {
    //     this.router.navigate(['/']);
    //   }
    // });

    // Aprés la connexion
    // this.user = await this.bridgeService.login();
    // On enregistre le USER dans l'état de app
    // this.stateService.userProfil = this.user;

  }

  logout() {
    this.stateService.logout();
    localStorage.clear();
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
