import { StyleInterface } from '@osmo6/models';

export class Style implements StyleInterface {
    public id_style: number;
    public label_style: string;

    constructor (style: StyleInterface) {
        this.id_style = style.id_style;
        this.label_style = style.label_style;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_style;
    }

    public getLabel (): string {
        return this.label_style;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel(val: string): Style {
        this.label_style = val;
        return this;
    }

    // ================ SETTERS ================
}