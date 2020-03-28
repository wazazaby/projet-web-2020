import { UserInterface } from "../../../interfaces";

export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _pass: string;
    private _actif: number;
    private _rgpd: number;
    private _token: string;
    private _dateCrea: number;
    private _dateModif: number;

    constructor (user: UserInterface) {
        this._id = user.id_user;
        this._name = user.name_user;
        this._email = user.email_user;
        this._pass = user.pass_user;
        this._actif = user.actif_user;
        this._rgpd = user.rgpd_user;
        this._token = user.token_user;
        this._dateCrea = user.create_date_user;
        this._dateModif = user.modification_date_user;
    }

    // ================ GETTERS ================

    public get id (): number {
        return this._id;
    }

    public get name (): string {
        return this._name;
    }

    public get email (): string {
        return this._email;
    }

    public get password (): string {
        return this._pass;
    }

    public get actif (): number {
        return this._actif;
    }

    public get rgpd (): number {
        return this._rgpd;
    }

    public get token (): string {
        return this._token;
    }

    public get dateCrea (): number {
        return this._dateCrea;
    }

    public get dateModif (): number | null {
        return this._dateModif;
    }

    // ================ GETTERS ================

    // ================ SETTERS ================

    public set name (val: string) {
        this._name = val;
    }

    public set password (val: string) {
        this._pass = val;
    }

    public set actif (val: number) {
        this._actif = val;
    }

    public set rgpd (val: number) {
        this._rgpd = val;
    }

    public set token (val: string) {
        this._token = val;
    }

    public set dateModif (val: number) {
        this._dateModif = val;
    }

    // ================ SETTERS ================
}