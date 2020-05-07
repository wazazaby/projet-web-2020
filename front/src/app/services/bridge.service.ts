/**
 * Ne mettre dans ce fichier que les liens avec l'API
 * Pas de variable d'état de l'application ici
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {  UserInterface, GarmentInterface, BrandInterface, GlobalReturnInterface,
          ErrorInterface, SeasonInterface, TypeInterface } from '@osmo6/models';
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

  /**
   * Exemple crud: actuelement Read
   * Récupére les data de la route /users
   * Le resultat de cette fonction est obligatoirement un 'UserModel'
   */
  getUser() {
    return this.http.get<UserInterface>(environment.apiUrl + 'users');
  }

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

      if (this.stateService.brand && this.stateService.season && this.stateService.type) {
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

  /**
   * Inscription
   */
  register() {
    console.log('register');
  }

  getGarmentUSer(userId: number, val: number): GarmentInterface[] {
    console.log('garment', userId);
    const res: GarmentInterface[] = [
      {
        id_garment: 1,
        label_garment: 't1.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 2, label_style: 'streetwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't2.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't3.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
      {
        id_garment: 1,
        label_garment: 't4.jpg',
        url_img_garment: '/assets/1/',
        creation_date_garment: 1586849406,
        modification_date_garment: 1586849406,
        user_id_user: 1,
        brand_id_brand: 1,
        season_id_season: 1,
        type_id_type: 1,
        has_styles: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        has_colors: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      }
    ];
    return res;
  }

}
