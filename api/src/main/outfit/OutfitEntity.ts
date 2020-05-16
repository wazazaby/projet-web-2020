import { OutfitInterface } from '@osmo6/models';

export class Outfit implements OutfitInterface {
    public id_outfit?: number;
    public label_outfit: string;
    public creation_date_outfit: number;
    public modification_date_outfit?: number;
    public user_id_user: number;

    constructor (iOutfit: OutfitInterface) {
        this.id_outfit = iOutfit.id_outfit;
        this.label_outfit = iOutfit.label_outfit;
        this.creation_date_outfit = iOutfit.creation_date_outfit;
        this.modification_date_outfit = iOutfit.modification_date_outfit;
        this.user_id_user = iOutfit.user_id_user;
    }

    // ================ GETTERS ================

    public getId (): (number|null) {
        return this.id_outfit;
    }

    public getLabel (): string {
        return this.label_outfit;
    }

    public getCreationDate (): number {
        return this.creation_date_outfit;
    }

    public getModificationDate (): (number|null) {
        return this.modification_date_outfit;
    }

    public getIdUser (): number {
        return this.user_id_user;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel (val: string): Outfit {
        this.label_outfit = val;
        return this;
    }

    public setModificationDate (val: number): Outfit {
        this.modification_date_outfit = val;
        return this;
    }

    // ================ SETTERS ================
}