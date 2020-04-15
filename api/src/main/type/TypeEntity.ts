import { TypeInterface } from '@osmo6/models';

export class Type implements TypeInterface {
    public id_type: number;
    public label_type: string;

    constructor (type: TypeInterface) {
        this.id_type = type.id_type;
        this.label_type = type.label_type;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_type;
    }

    public getLabel (): string {
        return this.label_type;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel(val: string): Type {
        this.label_type = val;
        return this;
    }

    // ================ SETTERS ================
}