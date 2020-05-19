import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from './services/states.service';
import { BridgeService } from './services/bridge.service';
import { NgcCookieConsentService, NgcNoCookieLawEvent, NgcInitializeEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(public route: Router,
              private bridgeService: BridgeService,
              private ccService: NgcCookieConsentService) {

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

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
    });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
