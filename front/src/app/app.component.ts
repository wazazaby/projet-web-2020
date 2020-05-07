import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from './services/states.service';
import { BridgeService } from './services/bridge.service';
import { ErrorInterface } from '@osmo6/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public route: Router,
              private stateService: StatesService,
              private bridgeService: BridgeService) {

    // Permet de garder en mémoire l'utilisateur
    // this.stateService.isLoggedIn().subscribe(res => {
    //   if (!res) {
    //     const token = localStorage.getItem('tkn');
    //     this.bridgeService.checkToken(token);
    //   }
    // });

    // Load toute les data dont l'app à besoin
    this.bridgeService.initData(true);

  }

  /**
   * Test de fonction pour test unitaire
   */
  test() {
    return 'test';
  }
}
