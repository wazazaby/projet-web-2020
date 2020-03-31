import { ColorModel } from "@osmo6/models/lib/ColorModel";

export class Color {
    private _id?: number;
    private _label: string;
    private _hex: string;
    private _rgb: string;

    constructor(color: ColorModel) {
        this._id = color.id_color;
        this._label = color.label_color;
        this._hex = color.hex_color;
        this._rgb = color.rgb_color;
    }

    // ================ GETTERS ================

    public get id (): number {
        return this._id;
    }

    public get label (): string {
        return this._label;
    }

    public get hex (): string {
        return this._hex;
    }

    public get rgb (): string {
        return this._rgb;
    }

    public get light() {
        return {
            label: this._label,
            hex: this._hex,
            rgb: this._rgb,
        }
    }

    // ================ GETTERS ================

    // ================ SETTERS ================

    public set label (val: string) {
        this._label = val;
    }

    public set hex (val: string) {
        this._hex = val;
    }

    public set rgb (val: string) {
        this._rgb = val;
    }

    // ================ SETTERS ================

}