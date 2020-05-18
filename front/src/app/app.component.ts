import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from './services/states.service';
import { BridgeService } from './services/bridge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public route: Router,
              private bridgeService: BridgeService) {

    // Load toute les data dont l'app à besoin
    this.bridgeService.initData(true);
    if (localStorage.getItem('tkn')) {
      this.bridgeService.checkToken(localStorage.getItem('tkn'));
    }
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
}
