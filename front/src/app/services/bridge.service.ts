/**
 * Ne mettre dans ce fichier que les liens avec l'API
 * Pas de variable d'état de l'application ici
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {  UserInterface, GarmentInterface, BrandInterface, GlobalReturnInterface,
          ErrorInterface, SeasonInterface, TypeInterface, GarmentColorStyleWrapperInterface, ColorInterface } from '@osmo6/models';
import { StatesService } from './states.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http: HttpClient,
              private stateService: StatesService) { }

  // url pour API node
  public brandAll = 'brand/all';
  public seasonAll = 'season/all';
  public typeAll = 'type/all';
  public colorAll = 'color/all';
  public userGarment = '/garment/all';

  /**
   * Exemple crud: actuelement Read
   * Récupére les data de la route /users
   * Le resultat de cette fonction est obligatoirement un 'UserModel'
   */
  // getUser() {
  //   return this.http.get<UserInterface>(environment.apiUrl + 'users');
  // }

  /**
   * Connexion
   * Permet d'identifier l'utilisateur
   * @return GlobalReturnInterface
   */
  login(email: string, pass: string) {
    const body = {
        email,
        pass
      };
    return this.http.post<GlobalReturnInterface>(environment.apiUrl + 'user/login', body);
  }

  initData(b: boolean): boolean {
    let isGood = false;
    if (b) {
      console.log('init les data de l\'application', b);
      this.getBrand();
      this.getSeason();
      this.getType();
      this.getColor();

      if (this.stateService.brand && this.stateService.season && this.stateService.type && this.stateService.color) {
        isGood = true;
      }
    }
    return isGood;
  }

  /**
   * Attribue les marques de vêtement à la var global
   */
  getBrand() {
    return this.getBrandReq().subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: BrandInterface[] = res.data;
        this.stateService.brand = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.brandAll};
        this.stateService.errors = err;
      }
    });
  }

  /**
   * Récupére toute les marques de vêtement
   */
  getBrandReq() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.brandAll);
  }

  /**
   * Attribue les saisons à la var global
   */
  getSeason() {
    return this.getSeasonReq().subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: SeasonInterface[] = res.data;
        this.stateService.season = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.seasonAll};
        this.stateService.errors = err;
      }
    });
  }

  /**
   * Récupére toute les saisons
   */
  getSeasonReq() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.seasonAll);
  }

  /**
   * Attribue les types de vêtement à la var global
   */
  getType() {
    return this.getTypeReq().subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: TypeInterface[] = res.data;
        this.stateService.type = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.typeAll};
        this.stateService.errors = err;
      }
    });
  }

  /**
   * Récupére toute les types de vêtement
   */
  getTypeReq() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.typeAll);
  }

  getGarmentUser(userId: number) {
    return this.getGarmentUserReq(userId).subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: GarmentColorStyleWrapperInterface[] = res.data;
        this.stateService.garment = data;
      } else {
        const err: ErrorInterface = {
          code: res.status,
          message: res.message,
          route: environment.apiUrl + 'user/' + userId + this.userGarment
        };
        this.stateService.errors = err;
      }
    });
  }

  getGarmentUserReq(userId: number) {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + 'user/' + userId + this.userGarment);
  }

  getColor() {
    return this.getColorReq().subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: ColorInterface[] = res.data;
        this.stateService.color = data;
      } else {
        const err: ErrorInterface = {
          code: res.status,
          message: res.message,
          route: environment.apiUrl + this.colorAll
        };
        this.stateService.errors = err;
      }
    });
  }

  getColorReq() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.colorAll);
  }

  /**
   * Inscription
   */
  register() {
    console.log('register');
  }

}
