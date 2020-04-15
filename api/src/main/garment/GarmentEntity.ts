import { GarmentInterface, ColorInterface, StyleInterface, TypeInterface } from '@osmo6/models';

export class Garment implements GarmentInterface {
    public id_garment?: number;
    public label_garment: string;
    public url_img_garment: string;
    public creation_date_garment: number;
    public modification_date_garment: number;
    public user_id_user: number;
    public brand_id_brand: number;
    public season_id_season: number;
    public type_id_type: TypeInterface;
    public style?: StyleInterface[];
    public color?: ColorInterface[];

    constructor (garment: GarmentInterface) {
        this.id_garment = garment.id_garment;
        this.label_garment = garment.label_garment;
        this.url_img_garment = garment.url_img_garment;
        this.creation_date_garment = garment.creation_date_garment;
        this.modification_date_garment = garment.modification_date_garment;
        this.user_id_user = garment.user_id_user;
        this.brand_id_brand = garment.brand_id_brand;
        this.season_id_season = garment.season_id_season;
        this.type_id_type = garment.type_id_type;
        this.style = garment.style;
        this.color = garment.color;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_garment;
    }

    public getLabel (): string {
        return this.label_garment;
    }

    public getUrlImage (): string {
        return this.url_img_garment;
    }

    public getCreationDate (): number {
        return this.creation_date_garment;
    }

    public getModificationDate (): number {
        return this.modification_date_garment;
    }

    public getIdUser (): number {
        return this.user_id_user;
    }

    public getIdBrand (): number {
        return this.brand_id_brand;
    }

    public getIdSeason (): number {
        return this.season_id_season;
    }

    public getIdType (): TypeInterface {
        return this.type_id_type;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel (val: string): Garment {
        this.label_garment = val;
        return this;
    }

    public setUrlImage (val: string): Garment {
        this.url_img_garment = val;
        return this;
    }

    public setModificationDate (val: number): Garment {
        this.modification_date_garment = val;
        return this;
    }

    public setIdBrand (val: number): Garment {
        this.brand_id_brand = val;
        return this;
    }

    public setIdSeason (val: number): Garment {
        this.season_id_season = val;
        return this;
    }

    public setIdType (val: TypeInterface): Garment {
        this.type_id_type = val;
        return this;
    }

    public setColors (val: ColorInterface[]): Garment {
        this.color = val;
        return this;
    }

    public setStyles (val: StyleInterface[]): Garment {
        this.style = val;
        return this;
    }

    // ================ SETTERS ================
}