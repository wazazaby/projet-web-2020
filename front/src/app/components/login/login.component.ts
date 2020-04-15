import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

  formSubmit: FormGroup = this.formBuild.group({
    email: ['testTonMail@turnstyle.com', Validators.required],
    password: ['123456', [Validators.required, Validators.minLength(8)]]
  });

  submitted = false;

  constructor(private formBuild: FormBuilder) { // contient services et imports

}

  ngOnInit() {

  }

  onLogin() {
    console.log('click onLogin()');

    // Data des inputs
    // this.formSubmit.value.email or this.formSubnmit.value.password

    console.log(this.formSubmit);
  }


}
