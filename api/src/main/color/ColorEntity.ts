import { ColorInterface } from '@osmo6/models';

export class Color implements ColorInterface {
    public id_color?: number;
    public label_color: string;
    public hex_color: string;
    public rgb_color: string;

    constructor(color: ColorInterface) {
        this.id_color = color.id_color;
        this.label_color = color.label_color;
        this.hex_color = color.hex_color;
        this.rgb_color = color.rgb_color;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_color;
    }

    public getLabel (): string {
        return this.label_color;
    }

    public getHex (): string {
        return this.hex_color;
    }

    public getRgb (): string {
        return this.rgb_color;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel (val: string): Color {
        this.label_color = val;
        return this;
    }

    public setHex (val: string): Color {
        this.hex_color = val;
        return this;
    }

    public setRgb (val: string): Color {
        this.rgb_color = val;
        return this;
    }

    // ================ SETTERS ================
}