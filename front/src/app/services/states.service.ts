/**
 * Ne mettre dans ce fichier que les variables d'état de l'application
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  UserInterface, BrandInterface, ColorInterface, SeasonInterface,
          StyleInterface, TypeInterface, ErrorInterface, GarmentColorStyleWrapperInterface } from '@osmo6/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private router: Router,
              public snackBar: MatSnackBar) { }

  // Var public

  // Var private
  private _brand: BehaviorSubject<BrandInterface[]> = new BehaviorSubject<BrandInterface[]>([]); // tslint:disable-line
  private _color: BehaviorSubject<ColorInterface[]> = new BehaviorSubject<ColorInterface[]>([]); // tslint:disable-line
  private _season: BehaviorSubject<SeasonInterface[]> = new BehaviorSubject<SeasonInterface[]>([]); // tslint:disable-line
  private _style: BehaviorSubject<StyleInterface[]> = new BehaviorSubject<StyleInterface[]>([]); // tslint:disable-line
  private _type: BehaviorSubject<TypeInterface[]> = new BehaviorSubject<TypeInterface[]>([]); // tslint:disable-line
  private _user: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null); // tslint:disable-line
  private _garment: BehaviorSubject<GarmentColorStyleWrapperInterface[]> = new BehaviorSubject<GarmentColorStyleWrapperInterface[]>([]); // tslint:disable-line
  private _garmentTop: BehaviorSubject<GarmentColorStyleWrapperInterface[]> = new BehaviorSubject<GarmentColorStyleWrapperInterface[]>([]); // tslint:disable-line
  private _garmentMid: BehaviorSubject<GarmentColorStyleWrapperInterface[]> = new BehaviorSubject<GarmentColorStyleWrapperInterface[]>([]); // tslint:disable-line
  private _garmentBot: BehaviorSubject<GarmentColorStyleWrapperInterface[]> = new BehaviorSubject<GarmentColorStyleWrapperInterface[]>([]); // tslint:disable-line

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

   /**
    * Permet d'afficher une barre d'information du le site
    * @param message: string
    * @param action: string
    * @param clas: string
    */
  openSnackBar( message: string, action: string, clas?: string) {
    const c = clas === 'err' ? 'snackErr' : '';
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: [c]
    });
  }

  /**
   * Organise tableaux
   * @var arr: Array[]
   * @var key:string
   */
  public orderArray(arr, where, key, order) {
    let x = 0;
    let y = 0;

    if (order === 'ASC') {
      x = 1;
      y = -1;
    } else {
      x = -1;
      y = 1;
    }

    arr.sort((a, b) => {
      if (a[where][key] < b[where][key]) { return x; }
      if (a[where][key] > b[where][key]) { return y; }
      return 0;
    });
  }

  /**
   * Trie les vêtements en fonction de leurs types
   * @param g garment
   */
  classGarment(g: GarmentColorStyleWrapperInterface[]) {
    const top = [];
    const mid = [];
    const bot = [];

    this.garmentTop = [];
    this.garmentMid = [];
    this.garmentBot = [];

    g.forEach(v => {
      switch (v.garment.type_id_type) {
        case 7 || 8 || 9 || 10 || 11 || 12 || 13 || 14:
          // top
          top.push(v);
          break;
        case 1 || 2 || 3 || 4 || 5 || 6:
          // mid
          mid.push(v);
          break;
        default:
          // bot
          bot.push(v);
          break;
      }
    });

    this.garmentTop = top;
    this.garmentMid = mid;
    this.garmentBot = bot;
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
    this.classGarment(u);
    this._garment.next(u);
  }

  public garmentAsObservable(): Observable<GarmentColorStyleWrapperInterface[]> {
    return this._garment.asObservable();
  }
  // ============================= Fin Garment =============================

  // ***********************************************************************
  // ========================== Début Garment Top ==========================
  public get garmentTop(): GarmentColorStyleWrapperInterface[] {
    return this._garmentTop.getValue();
  }

  public set garmentTop(u: GarmentColorStyleWrapperInterface[]) {
    this._garmentTop.next(u);
  }

  public garmentTopAsObservable(): Observable<GarmentColorStyleWrapperInterface[]> {
    return this._garmentTop.asObservable();
  }
  // ========================== Début Garment Top ==========================

    // ***********************************************************************
  // ========================== Début Garment Mid ==========================
  public get garmentMid(): GarmentColorStyleWrapperInterface[] {
    return this._garmentMid.getValue();
  }

  public set garmentMid(u: GarmentColorStyleWrapperInterface[]) {
    this._garmentMid.next(u);
  }

  public garmentMidAsObservable(): Observable<GarmentColorStyleWrapperInterface[]> {
    return this._garmentMid.asObservable();
  }
  // ========================== Début Garment Mid ==========================

    // ***********************************************************************
  // ========================== Début Garment Bot ==========================
  public get garmentBot(): GarmentColorStyleWrapperInterface[] {
    return this._garmentBot.getValue();
  }

  public set garmentBot(u: GarmentColorStyleWrapperInterface[]) {
    this._garmentBot.next(u);
  }

  public garmentBotAsObservable(): Observable<GarmentColorStyleWrapperInterface[]> {
    return this._garmentBot.asObservable();
  }
  // ========================== Début Garment Bot ==========================
  // =============================GETTER/SETTER=============================
}
