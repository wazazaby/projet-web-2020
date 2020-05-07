/**
 * Ne mettre dans ce fichier que les variables d'état de l'application
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  UserInterface, BrandInterface, ColorInterface, SeasonInterface,
          StyleInterface, TypeInterface, ErrorInterface, GarmentColorStyleWrapperInterface } from '@osmo6/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private router: Router) { }

  // Var public

  // Var private
  private _brand: BehaviorSubject<BrandInterface[]> = new BehaviorSubject<BrandInterface[]>([]); // tslint:disable-line
  private _color: BehaviorSubject<ColorInterface[]> = new BehaviorSubject<ColorInterface[]>([]); // tslint:disable-line
  private _season: BehaviorSubject<SeasonInterface[]> = new BehaviorSubject<SeasonInterface[]>([]); // tslint:disable-line
  private _style: BehaviorSubject<StyleInterface[]> = new BehaviorSubject<StyleInterface[]>([]); // tslint:disable-line
  private _type: BehaviorSubject<TypeInterface[]> = new BehaviorSubject<TypeInterface[]>([]); // tslint:disable-line
  private _user: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null); // tslint:disable-line
  private _garment: BehaviorSubject<GarmentColorStyleWrapperInterface[]> = new BehaviorSubject<GarmentColorStyleWrapperInterface[]>([]); // tslint:disable-line
  private _errors: BehaviorSubject<ErrorInterface> = new BehaviorSubject<ErrorInterface>(null); // tslint:disable-line

  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // tslint:disable-line

  /**
   * Permet de rediriger l'utilisateur après que la connexion soit établie
   */
  login() {
    // Si l'utilisateur est activer
    if (this.userProfil.actif_user === 1) {
      // console.log('Auth OK');
      setTimeout(() => {
        this.isLogin = true;
        // stock le token dans le navigateur: localstorage
        localStorage.setItem('tkn', this.userProfil.token_user);
        // redirige vers ...
        this.router.navigate(['/accueil']);
      }, 500);
    } else {
      setTimeout(() => {
        this.isLogin = null;
        // redirige vers ...
        this.router.navigate(['/auth']);
      }, 500);
    }
  }

  /**
   * Permet de vérifier que la session utilisateur est ouverte sur l'api
   */
  refrehApp(token) {
    if (token) {
      console.log(token);
      // Contacte l'API pour vérifier que la session user existe
      // this.bridgeService.getUserByToken(token);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  logout() {
    this.isLogin = false;
    this.router.navigated = false;
    this.router.navigate(['/auth']);
  }

  /**
   * Fonction de vérification des code de status de l'api
   * @param n: number
   */
  checkStatus(n: number): boolean {
    if (n >= 200 && n < 300) {
      return true;
    } else {
      return false;
    }
  }

  // =============================GETTER/SETTER=============================

  // ***********************************************************************
  // ============================= Début errors =============================
  public get errors(): ErrorInterface {
    return this._errors.getValue();
  }

  public set errors(u: ErrorInterface) {
    this._errors.next(u);
  }
  // ============================= Fin errors =============================

  // ***********************************************************************
  // ============================= Début type =============================
  public get type(): TypeInterface[] {
    return this._type.getValue();
  }

  public set type(u: TypeInterface[]) {
    this._type.next(u);
  }
  // ============================= Fin type =============================

  // ***********************************************************************
  // ============================= Début style =============================
  public get style(): StyleInterface[] {
    return this._style.getValue();
  }

  public set style(u: StyleInterface[]) {
    this._style.next(u);
  }
  // ============================= Fin style =============================

  // ***********************************************************************
  // ============================= Début season =============================
  public get season(): SeasonInterface[] {
    return this._season.getValue();
  }

  public set season(u: SeasonInterface[]) {
    this._season.next(u);
  }
  // ============================= Fin season =============================

  // ***********************************************************************
  // ============================= Début color =============================
  public get color(): ColorInterface[] {
    return this._color.getValue();
  }

  public set color(u: ColorInterface[]) {
    this._color.next(u);
  }
  // ============================= Fin color =============================

  // ***********************************************************************
  // ============================= Début brand =============================
  public get brand(): BrandInterface[] {
    return this._brand.getValue();
  }

  public set brand(u: BrandInterface[]) {
    this._brand.next(u);
  }
  // ============================= Fin brand =============================

  // ***********************************************************************
  // ============================= Début User =============================
  public get userProfil(): UserInterface {
    return this._user.getValue();
  }

  public set userProfil(u: UserInterface) {
    this._user.next(u);
  }

  public get userProfilsAsObservable(): Observable<UserInterface> {
    return this._user.asObservable();
  }
  // ============================= Fin User =============================

  // ***********************************************************************
  // ============================= Début login =============================

  public get isLogin(): boolean {
    return this._loggedIn.getValue();
  }

  public set isLogin(s: boolean) {
    this._loggedIn.next(s);
  }

  public isLoggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }
  // ============================= fin login =============================

  // ***********************************************************************
  // ============================= Début Garment =============================
  public get garment(): GarmentColorStyleWrapperInterface[] {
    return this._garment.getValue();
  }

  public set garment(u: GarmentColorStyleWrapperInterface[]) {
    this._garment.next(u);
  }

  public garmentAsObservable(): Observable<GarmentColorStyleWrapperInterface[]> {
    return this._garment.asObservable();
  }
  // ============================= Fin Garment =============================
  // =============================GETTER/SETTER=============================
}
