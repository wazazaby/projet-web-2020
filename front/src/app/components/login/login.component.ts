import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { Router } from '@angular/router';
import { BridgeService } from 'src/app/services/bridge.service';
import { ErrorInterface, UserInterface } from '@osmo6/models';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

  emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';


  formSubmit: FormGroup = this.formBuild.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.emailPattern)
    ])],
    password: ['', [Validators.required, Validators.minLength(8)]]

  });

  // décommenter pour démo
  // formSubmit: FormGroup = this.formBuild.group({
  //   email: ['example@example.com', Validators.compose([
  //     Validators.required,
  //     Validators.pattern(this.emailPattern)
  //   ])],
  //   password: ['passwordExample', [Validators.required, Validators.minLength(8)]]

  // });

  submitted = false;
  isLogin: boolean = true;
  isRegistered: boolean = false;
  isConnected: boolean = false;

  constructor(private formBuild: FormBuilder,
              private stateService: StatesService,
              private bridgeService: BridgeService,
              private route: Router) { // contient services et imports

}

  ngOnInit() {
    // console.log(this.formSubmit);
    console.log('test url', this.route.routerState.snapshot);
    const token = "ougyifvm";
    /**
     * if query param
     * isLogin && isRegistered = false
     * isConnected = true;
     * isAuth(token) => api
     * return true | false
     * if true email -> input email
     * if false -> affiche erreur pendant 10s -> redirect isregistered
     */
  }

  byPass() {
    this.stateService.login();
  }

  login() {
    this.bridgeService.login('mail@mail.com', 'motdepasse').subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: UserInterface = res.data;
        this.stateService.userProfil = data;
        console.log(true);
        this.byPass();
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'user/login'};
        this.stateService.errors = err;
        console.log(false);
      }
    });
  }

  logout() {
    this.stateService.logout();
  }

  onLogin() {
    console.log('click onLogin()');

    // Data des inputs
    // this.formSubmit.value.email or this.formSubnmit.value.password
    console.log(this.formSubmit);
  }


}
