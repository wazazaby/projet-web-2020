/**
 * Ne mettre dans ce fichier que les liens avec l'API
 * Pas de variable d'état de l'application ici
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {  BrandInterface, GlobalReturnInterface,
          ErrorInterface, SeasonInterface, TypeInterface,
          GarmentColorStyleWrapperInterface, ColorInterface, StyleInterface, OutfitGarmentWrapperInterface } from '@osmo6/models';
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
    public userOutfitAdd = 'outfit/add';
    public userOutfit = '/outfit/all';
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
        const body = { email, pass };
        return this.http.post<GlobalReturnInterface>(environment.apiUrl + 'user/login', body, { withCredentials: true });
    }

    /**
     * Inscription
     */
    register(infos: { name: string, mail: string, pass: string }) {
        const body = {
            name: infos.name,
            email: infos.mail,
            pass: infos.pass
        };

        return this.http.post<GlobalReturnInterface>(`${environment.apiUrl}user/add`, body);
    }

    /**
     * Active un user en fonction de son token
     * @param {string} token token
     */
    activateUser(token: string) {
        return this.http.get<GlobalReturnInterface>(`${environment.apiUrl}user/activate/${token}`);
    }

    disconnect() {
        this.disconnectReq().subscribe(res => {
            if (this.stateService.checkStatus(res.status)) {
                localStorage.clear();
                this.stateService.isLogin = false;
                this.router.navigated = false;
                this.router.navigate(['/auth']);
                this.stateService.openSnackBar(res.message.toString(), null);
            } else {
                const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.logout};
                this.stateService.openSnackBar(err.message, null, 'err');
                this.stateService.errors = err;
            }
        });
    }

    checkToken(token) {
        if (token) {
            this.checkTokenReq(token).subscribe(res => {
                if (this.stateService.checkStatus(res.status)) {
                    this.stateService.userProfil = res.data;
                    this.getGarmentUser(res.data.id_user);
                    this.stateService.login();
                } else {
                    const err: ErrorInterface = {
                        code: res.status, message: res.message, route: environment.apiUrl + this.checkTkn};
                    this.stateService.errors = err;
                    this.stateService.openSnackBar(err.message, null, 'err');
                    this.router.navigate(['/auth']);
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
                this.stateService.openSnackBar(err.message, null, 'err');
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
                this.stateService.openSnackBar(err.message, null, 'err');
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
                this.stateService.openSnackBar(err.message, null, 'err');
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
                this.stateService.openSnackBar(err.message, null, 'err');
                this.stateService.errors = err;
            }
        });
    }

    /**
     * Attribue les marques de vêtement à la variable global {this.stateService.brand}
     */
    getBrand() {
        return this.getBrandReq().subscribe(res => {
            console.log(res);
            if (this.stateService.checkStatus(res.status)) {
                const data: BrandInterface[] = res.data;
                this.stateService.brand = data;
            } else {
                const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.brandAll};
                this.stateService.openSnackBar(err.message, null, 'err');
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
                this.stateService.openSnackBar(err.message, null, 'err');
                this.stateService.errors = err;
            }
        });
    }

    /**
     * Attribue les tenue de vêtement à la variable global {this.stateService.outfit}
     */
    getAllOutfit(userId: number) {
        return this.getAllOutfitReq(userId).subscribe(res => {
            if (this.stateService.checkStatus(res.status)) {
                const data: OutfitGarmentWrapperInterface[] = res.data;
                this.stateService.outfit = data;
            } else {
                const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + this.styleAll};
                this.stateService.openSnackBar(err.message, null, 'err');
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
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.colorAll, { withCredentials: true });
    }

    /**
     * Créer un observable des types de vêtement
     */
    getTypeReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.typeAll, { withCredentials: true });
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
    addGarment(formData: FormData) {
        return this.http.post<GlobalReturnInterface>(`${environment.apiUrl}${this.userGarmentAdd}`, formData, { withCredentials: true });
    }

    /**
     * Permet de modifier un vêtement
     */
    upadateGarment(formData: FormData) {
        return this.http.patch<GlobalReturnInterface>(`${environment.apiUrl}${this.userGarmentSet}`, formData, { withCredentials: true });
    }

    /**
     * Créer un observable pour supprimer un vêtement
     */
    deleteGarmentReq(data: GarmentColorStyleWrapperInterface) {
        const idUser: number = data.garment.user_id_user;
        const idGarment: number = data.garment.id_garment;
        const url = `${environment.apiUrl}user/${idUser}/garment/delete/${idGarment}`;
        return this.http.delete<GlobalReturnInterface>(url, { withCredentials: true });
    }

    /**
     * Permet d'ajouter une tenue
     */
    addOutfit(body: {label_outfit: string, user_id_user: number, id_garments: number[]}) {
        return this.http.post<GlobalReturnInterface>(environment.apiUrl + this.userOutfitAdd, body, { withCredentials: true });
    }

    /**
     * Permet de récupérer toute les tenues d'un utilisateur
     * @param userId number
     */
    getAllOutfitReq(userId: number) {
        return this.http.get<GlobalReturnInterface>(
            environment.apiUrl + 'user/' + userId + this.userOutfit,
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
     * Créer un observable des saisons
     */
    getSeasonReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.seasonAll, { withCredentials: true });
    }

    /**
     * Créer un observable des marques de vêtement
     */
    getBrandReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.brandAll, { withCredentials: true });
    }

    /**
     * Créer un observable des styles de vêtement
     */
    getStyleReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.styleAll, { withCredentials: true });
    }

    /**
     * Permet de clean la session API du user
     */
    disconnectReq() {
        return this.http.get<GlobalReturnInterface>(environment.apiUrl + this.logout, { withCredentials: true });
    }

    /**
     * Permet de vérifier si l'utilisateur est toujours Auth sur l'API
     * @param token: string
     */
    checkTokenReq(token: string) {
        const body = {
            token
        };
        return this.http.post<GlobalReturnInterface>(environment.apiUrl + this.checkTkn, body, {withCredentials: true});
    }

// ****************************************************************************************

}
