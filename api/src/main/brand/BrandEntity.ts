import { BrandInterface } from '@osmo6/models';

export class Brand implements BrandInterface {
    public id_brand: number;
    public label_brand: string;

    constructor (brand: BrandInterface) {
        this.id_brand = brand.id_brand;
        this.label_brand = brand.label_brand;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_brand;
    }

    public getLabel (): string {
        return this.label_brand;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel(val: string): Brand {
        this.label_brand = val;
        return this;
    }

    // ================ SETTERS ================
}