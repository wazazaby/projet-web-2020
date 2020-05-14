/**
 * Ne mettre dans ce fichier que les liens avec l'API
 * Pas de variable d'état de l'application ici
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {  BrandInterface, GlobalReturnInterface,
          ErrorInterface, SeasonInterface, TypeInterface,
          GarmentColorStyleWrapperInterface, ColorInterface, StyleInterface } from '@osmo6/models';
import { StatesService } from './states.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

    constructor(private http: HttpClient,
                private stateService: StatesService,
                private router: Router) { }

    // url pour API
    public brandAll = 'brand/all';
    public seasonAll = 'season/all';
    public typeAll = 'type/all';
    public colorAll = 'color/all';
    public styleAll = 'style/all';
    public userGarment = '/garment/all';
    public userGarmentAdd = 'garment/add';
    public userGarmentSet = 'garment/update';
    public userGarmentRm = '/garment/delete/';
    public logout = 'user/logout';
    public snackBar = null;
    public checkTkn = 'user/verify-auth';

/*
 ******************************* function d'auth *******************************
 */
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

        return this.http.post<GlobalReturnInterface>(environment.apiUrl + 'user/login', body, { withCredentials: true });
    }

    /**
     * Inscription
     */
    register (infos: { name: string, mail: string, pass: string }) {
        const body = {
            name: infos.name,
            email: infos.mail,
            pass: infos.pass
        };

        return this.http.post<GlobalReturnInterface>(`${environment.apiUrl}user/add`, body);
    }

    /**
     * Active un user en fonction de son token
     * @param {string} token 
     */
    activateUser (token: string) {
        return this.http.get<GlobalReturnInterface>(`${environment.apiUrl}user/activate/${token}`);
    }

    disconnect () {
        this.disconnectReq().subscribe(res => {
            if (this.stateService.checkStatus(res.status)) {
                localStorage.clear();
                this.stateService.isLogin = false;
                this.router.navigated = false;
                this.router.navigate(['/auth']);
                this.stateService.openSnackBar(res.message.toString(), null);
            } else {
                const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.logout};
                this.stateService.errors = err;
            }
        });
    }

    checkToken(token) {
        console.log('checktoken', token);
        if (token) {
            this.checkTokenReq(token).subscribe(res => {
                if (this.stateService.checkStatus(res.status)) {
                    console.log('r', res);
                } else {
                    const err: ErrorInterface = {
                        code: res.status, message: res.message, route: environment.apiUrl + this.checkTkn};
                    this.stateService.errors = err;
                    console.log(err);
                }
            });
        }
    }

// ****************************************************************************************


    /**
     * Permet de charger l'emsemble des data necessaire à l'APP
     * @param b: boolean
     */
    initData(b: boolean): boolean {
        let isGood = false;
        if (b) {
            console.log('init les data de l\'application', b);
            this.getBrand();
            this.getSeason();
            this.getType();
            this.getColor();
            this.getStyle();

            if (this.stateService.brand && this.stateService.season && this.stateService.type &&
                this.stateService.color && this.stateService.style) {
                isGood = true;
            }
        }
        return isGood;
    }


/*
 *******************************alimente les variables glabal*******************************
 */

    /**
     * Attribue les types de vêtement à la variable global {this.stateService.type}
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
     * Attribue les couleurs de vêtement à la variable global {this.stateService.color}
     */
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

    /**
     * Attribue les vétements à la variable global {this.stateService.garment}
     * @param userId: number
     */
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

    /**
     * Attribue les saisons à la variable global {this.stateService.season}
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
     * Attribue les marques de vêtement à la variable global {this.stateService.brand}
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
     * Attribue les styles de vêtement à la variable global {this.stateService.brand}
     */
    getStyle() {
        return this.getStyleReq().subscribe(res => {
            if (this.stateService.checkStatus(res.status)) {
                const data: StyleInterface[] = res.data;
                this.stateService.style = data;
            } else {
                const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.styleAll};
                this.stateService.errors = err;
            }
        });
    }


// ****************************************************************************************


/*
 *******************************Requete simple*******************************
 */
    /**
     * Créer un observable des couleurs de vêtement à la var global
     */
    getColorReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.colorAll);
    }

    /**
     * Créer un observable des types de vêtement
     */
    getTypeReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.typeAll);
    }

    /**
     * Créer un observable des vêtements d'un user
     * @param userId: number
     */
    getGarmentUserReq(userId: number) {
        return this.http.get<GlobalReturnInterface>(
            environment.apiUrl + 'user/' + userId + this.userGarment,
            {
                headers: new HttpHeaders({
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-type': 'multipart/form-data',
                }),
                withCredentials: true
            }
        );
    }

    /**
     * Permet d'ajouter un vêtement
     */
    addGarment(file, param) {
        const body = {
            file,
            param
        };

        return this.http.post(environment.apiUrl + this.userGarmentAdd, body,
            { withCredentials: true }
        );
    }

    /**
     * Créer un observable pour supprimer un vêtement
     */
    deleteGarmentReq(data: GarmentColorStyleWrapperInterface) {
        return this.http.delete<GlobalReturnInterface>(
            environment.apiUrl + 'user/' + data.garment.user_id_user + '/garment/delete/' + data.garment.id_garment,
            {
                headers: new HttpHeaders({
                    'Access-Control-Allow-Origin': '*'
                }),
                withCredentials: true
            });
    }

    /**
     * Créer un observable des saisons
     */
    getSeasonReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.seasonAll);
    }

    /**
     * Créer un observable des marques de vêtement
     */
    getBrandReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.brandAll);
    }

    /**
     * Créer un observable des styles de vêtement
     */
    getStyleReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.styleAll);
    }

    /**
     * Permet de clean la session API du user
     */
    disconnectReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.logout);
    }

    /**
     * Permet de vérifier si l'utilisateur est toujours Auth sur l'API
     * @param token: string
     */
    checkTokenReq(token: string) {
        const body = {
            token
        };
        return this.http.post<GlobalReturnInterface>(environment.apiUrl + this.checkTkn, body);
    }

// ****************************************************************************************

}
