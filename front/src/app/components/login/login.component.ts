import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BridgeService } from 'src/app/services/bridge.service';
import { ErrorInterface, UserInterface } from '@osmo6/models';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

  /** Lorque l'utilisateur click sur le btn connexion */
  isLogin = false;
  /** Lorque l'utilisateur click sur le btn inscription */
  isRegistered = false;
  /** Lorsque l'utilisateur arrive sur le site */
  isHome = true;
  /** */
  hide = true;
  /** Token utilisateur */
  public token: string;

  /** Formulaire de connexion */
  formConnect: FormGroup = this.formBuild.group({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    pass: new FormControl('', [Validators.required]),
  });

  constructor(private formBuild: FormBuilder,
              private stateService: StatesService,
              private bridgeService: BridgeService,
              private route: Router,
              private activeRoute: ActivatedRoute) { // contient services et imports

  }

  ngOnInit() {
    // test d'url
    // http://localhost:4200/auth?t=testdetoken

    this.activeRoute.queryParams.subscribe(res => {
      this.token = res.t;
    });
  }

  /**
   * Permet de switcher entre l'inscrip^tion/la connexion ou la page d'accueil
   * @param value string
   */
  effectBtn(value: string) {
    switch (value) {
      case 'inscription':
        this.isRegistered = true;
        this.isLogin = false;
        this.isHome = false;
        break;
      case 'connexion':
        this.isLogin = true;
        this.isRegistered = false;
        this.isHome = false;
        break;
      default:
        break;
    }
    console.log(value);
  }

  /**
   * Permet à l'utilisateur de se connecter au site
   */
  login() {
    if (this.formConnect.valid) {
      const email = this.formConnect.value.email;
      const pass = this.formConnect.value.pass;
      // const email = 'mail@mail.com';
      // const pass = 'motdepasse';

      this.bridgeService.login(email, pass).subscribe(res => {
        if (this.stateService.checkStatus(res.status)) {
          const data: UserInterface = res.data;
          this.stateService.userProfil = data;
          this.stateService.login();
        } else {
          const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'user/login'};
          this.stateService.errors = err;
          console.log('Login Error', false);
        }
      });
    } else {
      this.formConnect.markAllAsTouched();
    }

    // this.bridgeService.login('mail@mail.com', 'motdepasse').subscribe(res => {
    //   if (this.stateService.checkStatus(res.status)) {
    //     const data: UserInterface = res.data;
    //     this.stateService.userProfil = data;
    //     console.log('Login OK', true, data.url_img_user);
    //     this.stateService.login();
    //   } else {
    //     const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'user/login'};
    //     this.stateService.errors = err;
    //     console.log('Login Error', false);
    //   }
    // });
  }

}
