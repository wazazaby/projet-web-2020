import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<UserModel>(environment.apiUrl + 'users');
  }
}
