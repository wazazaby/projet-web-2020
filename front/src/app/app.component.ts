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
              private stateService: StatesService,
              private bridgeService: BridgeService) {

    const token = localStorage.getItem('tkn');
    this.stateService.refrehApp(token);

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
