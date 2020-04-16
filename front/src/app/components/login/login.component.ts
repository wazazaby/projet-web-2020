import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { Router } from '@angular/router';

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

  constructor(private formBuild: FormBuilder,
              private stateService: StatesService,
              private route: Router) { // contient services et imports

}

  ngOnInit() {
    // console.log(this.formSubmit);
  }

  login() {
    this.stateService.login();
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
