import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {  UserInterface, GarmentInterface, BrandInterface, GlobalReturnInterface,
          ErrorInterface, SeasonInterface, TypeInterface } from '@osmo6/models';
import { StatesService } from './states.service';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http: HttpClient,
              private stateService: StatesService) { }

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
   */
  login() {
    console.log('login');
  }

  initData(b: boolean): void {
    console.log('init', b);
    if (b) {
      this.stateService.reloadApp = false;
      this.getBrand();
      this.getSeason();
      this.getType();
    }
  }

  /**
   * Récupére toute les marques de vêtement
   */
  getBrand() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + 'brand/all').subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: BrandInterface[] = res.data;
        this.stateService.brand = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'brand/all'};
        this.stateService.errors = err;
      }
    });
  }

  /**
   * Récupére toute les saisons
   */
  getSeason() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + 'season/all').subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: SeasonInterface[] = res.data;
        this.stateService.season = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'season/all'};
        this.stateService.errors = err;
      }
    });
  }

  /**
   * Récupére toute les types de vêtement
   */
  getType() {
    return this.http.get<GlobalReturnInterface>(environment.apiUrl + 'type/all').subscribe(res => {
      if (this.stateService.checkStatus(res.status)) {
        const data: TypeInterface[] = res.data;
        this.stateService.type = data;
      } else {
        const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'type/all'};
        this.stateService.errors = err;
      }
    });
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 2, label_style: 'streetwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
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
        style: [
          {id_style: 1, label_style: 'sportwear'},
          {id_style: 3, label_style: 'smart'}
        ],
        color: [
          {id_color: 1, label_color: 'cyan', hex_color: '#0ABAB5', rgb_color: 'rgb(10,186,181)'},
          {id_color: 2, label_color: 'black', hex_color: '#000000', rgb_color: 'rgb(0,0,0)'},
        ]
      },
    ];
    return res;
  }

}
