import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserModel } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http: HttpClient) { }

  /**
   * Exemple crud: actuelement Read
   * Récupére les data de la route /users
   * Le resultat de cette fonction est obligatoirement un 'UserModel'
   */
  getUser() {
    return this.http.get<UserModel>(environment.apiUrl + 'users');
  }

  /**
   * Exemple crud: actuelement Read
   * Récupére les data de la table test
   */
  getTest() {
    return this.http.get(environment.apiUrl + 'test');
  }

  login() {
    console.log('login');
  }

  register() {
    console.log('register');
  }

}
