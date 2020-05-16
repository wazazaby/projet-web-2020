import { Db } from '../../libs/Db';
import { Outfit } from './OutfitEntity';
import { GarmentColorStyleWrapperInterface } from '@osmo6/models';
import { GarmentManager } from '../garment/GarmentManager';

export class OutfitManager {

    public async getOutfitById (id: number): Promise<any> {
        const sql: string = 'SELECT * FROM outfit WHERE id_outfit = ?';
        try {
            const res: any = await Db.pool.execute(sql, [id]);
            if (res[0].length > 0) {
                const fit: Outfit = new Outfit(res[0][0]);
                
                const sqLinks: string = `
                    SELECT garment_id_garment 
                    FROM outfit_has_garment 
                    WHERE outfit_id_outfit = ?
                `;

                const idGarms: any = await Db.pool.execute(sqLinks, [fit.getId()]);

                let allGarms: GarmentColorStyleWrapperInterface[] = [];
                if (idGarms[0].length > 0) {
                    const gManager: GarmentManager = new GarmentManager();
                    const tabPromise: Promise<GarmentColorStyleWrapperInterface>[] = [];
                    for (const garm of idGarms[0]) {
                        tabPromise.push(gManager.getGarmentById(garm.garment_id_garment));
                    }

                    allGarms = await Promise.all(tabPromise);
                }

                return {
                    outfit: fit,
                    garments: allGarms
                }
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }


    /**
     * Permet de créer une tenu et faire les liaisons avec les vêtements qui appartiennent à cette tenu
     * @param {Outfit} outfit 
     * @param garments 
     */
    public async insertOutfit (outfit: Outfit, garments: number[]): Promise<any> {
        const sql: string = `INSERT INTO outfit VALUES (?, ?, ?, ?, ?)`;
        try {
            const insert: any = await Db.pool.execute(sql, [
                outfit.getId(),
                outfit.getLabel(),
                outfit.getCreationDate(),
                outfit.getModificationDate(),
                outfit.getIdUser()
            ]);

            if (insert[0].affectedRows === 1) {
                const idNewFit: number = insert[0].insertId;
                if (await this.generateOutfitLinks(idNewFit, garments)) {
                    const test: any = await this.getOutfitById(idNewFit);
                    return test;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    private async insertOutfitGarm (idFit: number, idGarm: number): Promise<boolean> {
        const sql: string = `INSERT INTO outfit_has_garment VALUES (?, ?, ?)`;
        try {
            const i: any = await Db.pool.execute(sql, [null, idFit, idGarm]);
            if (i[0].affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    private async generateOutfitLinks (idFit: number, garments: number[]): Promise<boolean> {
        const isTrue = (value: boolean): boolean => value;
        const result: Promise<boolean>[] = [];
        for (const idGarm of garments) {
            result.push(this.insertOutfitGarm(idFit, idGarm));
        }

        const resolved: boolean[] = await Promise.all(result);
        return resolved.every(isTrue);
    }
}