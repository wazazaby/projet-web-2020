import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  UserInterface, BrandInterface, ColorInterface, SeasonInterface,
          StyleInterface, TypeInterface, ErrorInterface } from '@osmo6/models';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor() { }

  // Var public
  // Liste des saisons
  // public season = [
  //   {val: 0, title: 'Hiver'},
  //   {val: 1, title: 'Printemps'},
  //   {val: 2, title: 'Été'},
  //   {val: 3, title: 'Automne'}
  // ];

  // Var private
  private _brand: BehaviorSubject<BrandInterface[]> = new BehaviorSubject<BrandInterface[]>([]); // tslint:disable-line
  private _color: BehaviorSubject<ColorInterface[]> = new BehaviorSubject<ColorInterface[]>([]); // tslint:disable-line
  private _season: BehaviorSubject<SeasonInterface[]> = new BehaviorSubject<SeasonInterface[]>([]); // tslint:disable-line
  private _style: BehaviorSubject<StyleInterface[]> = new BehaviorSubject<StyleInterface[]>([]); // tslint:disable-line
  private _type: BehaviorSubject<TypeInterface[]> = new BehaviorSubject<TypeInterface[]>([]); // tslint:disable-line
  private _user: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null); // tslint:disable-line
  private _errors: BehaviorSubject<ErrorInterface> = new BehaviorSubject<ErrorInterface>(null); // tslint:disable-line

  // Permet de refresh les data en ca de F5
  private _reloadApp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // tslint:disable-line

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
  public get reloadApp(): boolean {
    return this._reloadApp.getValue();
  }

  public set reloadApp(u: boolean) {
    this._reloadApp.next(u);
  }
  // ============================= Fin errors =============================

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
  // =============================GETTER/SETTER=============================
}
