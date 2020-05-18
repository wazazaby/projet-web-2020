import { Component, OnInit } from '@angular/core';
import { RouteInterface, UserInterface } from '@osmo6/models';
import { Router } from '@angular/router';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalProfilComponent } from '../modal-profil/modal-profil.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /** base url upload image */
  urlUpload = environment.apiUpload;

  /**
   * Valeur du hamburger (barre de navigation "responsive")
   */
  isCollapse: boolean = false; // tslint:disable-line

  /**
   * On ajoute les différentes route ici (génére la barre de navigation principal)
   */
  sideBar: RouteInterface[] = [
    {path: 'accueil', isActive: true, title: 'Accueil', icon: '<i class="fas fa-home"></i>'},
    {path: 'tenues', isActive: false, title: 'Tenues', icon: '<i class="fas fa-tshirt"></i>'},
    {path: 'garde-robes', isActive: false, title: 'Garde robe', icon: '<i class="fas fa-plus"></i>'}
  ];

  // Load l'utilisateur
  user: UserInterface = this.stateService.userProfil;

  // Permet de savoir si l'utilisateur est auth (gestion de router différent)
  isLoggedIn$: boolean;

  constructor(private router: Router,
              private stateService: StatesService,
              private bridgeService: BridgeService,
              public dialog: MatDialog) {}

  ngOnInit() {
    // Permet d'utiliser 2 router différents
    this.stateService.isLoggedIn().subscribe((b: boolean) => {
      this.isLoggedIn$ = b;
    });

    this.stateService.userProfilsAsObservable.subscribe((u: UserInterface) => {
      this.user = u;
    });
  }

  /**
   * Permet de ce deconnecter de l'application
   */
  logout() {
    this.bridgeService.disconnect();
  }

  // Ouvre un modal pour afficher le profil utilisateur
  openModal(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(ModalProfilComponent, {
        // width: '50%',
        data: {user: this.user}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }
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
      } else if (e.type === 'click') {
        bool = !this.isCollapse;
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
