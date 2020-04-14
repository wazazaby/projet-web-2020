import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

  formSubmit: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submitted = false;

  // inutile s'il y à un FormGroup
  // -----------------------------------
  // email = 'blah';
  // password = '';
  // -----------------------------------
  // plus correct comme éxpréssion
  // formSubmit: FormGroup = this.formBuild.group({
  //   email: ['test@mail.com', Validators.required],
  //   password: ['123456', [Validators.required, Validators.minLength(8)]]
  // });

  constructor(private formBuild: FormBuilder) { // contient services et imports

}

  ngOnInit() {

  }

  onLogin() {
    console.log('click onLogin()');

    // Data compris dans tes input
    // this.formSubmit.value.email or this.formSubnmit.value.password
    console.log(this.formSubmit);
  }


}
