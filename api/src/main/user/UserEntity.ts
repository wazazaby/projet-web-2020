import { UserInterface } from '@osmo6/models';

export class User implements UserInterface {
    public id_user?: number;
    public name_user: string;
    public email_user: string;
    public pass_user: string;
    public actif_user: number;
    public rgpd_user: number;
    public token_user: string;
    public img_user?: string;
    public creation_date_user: number;
    public modification_date_user?: number;

    constructor (user: UserInterface) {
        this.id_user = user.id_user;
        this.name_user = user.name_user;
        this.email_user = user.email_user;
        this.pass_user = user.pass_user;
        this.actif_user = user.actif_user;
        this.rgpd_user = user.rgpd_user;
        this.token_user = user.token_user;
        this.img_user = user.img_user;
        this.creation_date_user = user.creation_date_user;
        this.modification_date_user = user.modification_date_user;
    }

    // ================ SETTERS ================

    public setName (val: string): User {
        this.name_user = val;
        return this;
    }

    public setPassword (val: string): User {
        this.pass_user = val;
        return this;
    }

    public setActif (val: number): User {
        this.actif_user = val;
        return this;
    }

    public setToken (val: string): User {
        this.token_user = val;
        return this;
    }

    public setImg (val: string): User {
        this.img_user = val;
        return this;
    }

    public setModificationDate (val: number): User {
        this.modification_date_user = val;
        return this;
    }

    // ================ SETTERS ================



    // ================ GETTERS ================

    public getId (): number {
        return this.id_user;
    }

    public getName (): string {
        return this.name_user;
    }

    public getEmail (): string {
        return this.email_user;
    }

    public getPass (): string {
        return this.pass_user;
    }

    public getActif (): number {
        return this.actif_user;
    }

    public getRgpd (): number {
        return this.rgpd_user;
    }

    public getToken (): string {
        return this.token_user;
    }

    public getImg (): string | null {
        return this.img_user;
    }

    public getCreationDate (): number {
        return this.creation_date_user;
    }

    public getModificationDate (): number | null {
        return this.modification_date_user;
    }

    // ================ GETTERS ================
}