import { SeasonInterface } from '@osmo6/models';

export class Season implements SeasonInterface {
    public id_season: number;
    public label_season: string;

    constructor (season: SeasonInterface) {
        this.id_season = season.id_season;
        this.label_season = season.label_season;
    }

    // ================ GETTERS ================

    public getId (): number {
        return this.id_season;
    }

    public getLabel (): string {
        return this.label_season;
    }

    // ================ GETTERS ================



    // ================ SETTERS ================

    public setLabel(val: string): Season {
        this.label_season = val;
        return this;
    }

    // ================ SETTERS ================
}