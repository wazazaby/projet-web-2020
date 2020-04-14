import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email='blah';
  password='';

  constructor() { }

  ngOnInit() {

  function onLogin()
  {
    console.log('login is my name, bitch');
  };

  }

}
