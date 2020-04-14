import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from '@osmo6/models';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient) { }

  private _user: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null); // tslint:disable-line

  // =============================GETTER/SETTER=============================
  public get userProfil(): UserInterface {
    return this._user.getValue();
  }

  public set userProfil(u: UserInterface) {
    this._user.next(u);
  }

  public get userProfilsAsObservable(): Observable<UserInterface> {
    return this._user.asObservable();
  }
  // =============================GETTER/SETTER=============================
}
