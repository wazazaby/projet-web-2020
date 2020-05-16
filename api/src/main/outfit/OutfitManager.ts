import { Db } from '../../libs/Db';
import { Outfit } from './OutfitEntity';

export class OutfitManager {


    public async insertOutfit (outfit: Outfit, garments?: { top: number, mid: number, bot: number }): Promise<null> {
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
                await this.generateOutfitLinks(idNewFit, garments);
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    private async insertOutfitGarm (idFit: number, idGarm: number, type: string): Promise<boolean> {
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

    private async generateOutfitLinks (idFit: number, garments?: { top: number, mid: number, bot: number }): Promise<boolean> {
        const isTrue = (value: boolean): boolean => value;

        const resolved: boolean[] = await Promise.all([
            this.insertOutfitGarm(idFit, garments.top, 'top'),
            this.insertOutfitGarm(idFit, garments.mid, 'mid'),
            this.insertOutfitGarm(idFit, garments.bot, 'bit')
        ]);
        
        return resolved.every(isTrue);
    }
}