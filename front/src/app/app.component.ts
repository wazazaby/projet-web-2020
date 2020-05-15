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

    // Load toute les data dont l'app à besoin
    this.bridgeService.initData(true);
    this.bridgeService.checkToken(localStorage.getItem('tkn'));
  }

  /**
   * Permet de vérifier que l'on utilise bien le bon router
   */
  isAuth(): boolean {
    if (this.route.url === '/auth' || this.route.url.slice(0, 6) === '/auth?') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Test de fonction pour test unitaire
   */
  test() {
    return 'test';
  }
}
