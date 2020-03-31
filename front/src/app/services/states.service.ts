import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '@osmo6/models';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient) { }

  private _user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null); // tslint:disable-line

  // =============================GETTER/SETTER=============================
  public get userProfil(): UserModel {
    return this._user.getValue();
  }

  public set userProfil(u: UserModel) {
    this._user.next(u);
  }

  public get userProfilsAsObservable(): Observable<UserModel> {
    return this._user.asObservable();
  }
  // =============================GETTER/SETTER=============================
}
