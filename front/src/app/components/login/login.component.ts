import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

  formSubmit: FormGroup;
  submitted = false;

  email = 'blah';
  password = '';

  constructor(private formBuild: FormBuilder) { // contient services et imports

}

  ngOnInit() {
    this.formSubmit = this.formBuild.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    console.log('login is my name, bitch');
  }


}
