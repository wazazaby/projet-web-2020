import { Db } from '../../libs/Db';
import { Outfit } from './OutfitEntity';
import { GarmentColorStyleWrapperInterface, OutfitGarmentWrapperInterface } from '@osmo6/models';
import { GarmentManager } from '../garment/GarmentManager';

export class OutfitManager {

    /**
     * Permet de récupérer un outfit ainsi que les garments qui lui sont associés par rapport à son id
     * @param id l'id de l'outfit que l'on souhaite récupérer
     * @returns {Promise<(OutfitGarmentWrapperInterface|null)>} l'outfit si trouvé, null dans le cas contraire
     */
    public async getOutfitById (id: number): Promise<(OutfitGarmentWrapperInterface|null)> {
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

                // On instancie le tableau qui recevra les garments de l'outfit
                let allGarms: GarmentColorStyleWrapperInterface[] = [];

                // Si il y a bien quelque chose, on peuple le tableau
                if (idGarms[0].length > 0) {

                    // On fait appel au GarmentManager pour récupérer les garments par leur id
                    const gManager: GarmentManager = new GarmentManager();
                    const tabPromise: Promise<GarmentColorStyleWrapperInterface>[] = [];
                    for (const garm of idGarms[0]) {
                        tabPromise.push(gManager.getGarmentById(garm.garment_id_garment));
                    }

                    // On résout le tout est on y passe au tableau précedemment instancié
                    allGarms = await Promise.all(tabPromise);
                }
                
                // On retourne l'outfit avec ses garments (peuvent être vides)
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
     * Permet de récupérer la liste des garments associés à un outfit
     * @param idFit l'id de l'outfit
     * @returns {Promise<GarmentColorStyleWrapperInterface[]>} la liste des garments (avec les styles et couleurs qui leurs sont associés)
     */
    private async getGarmentsByIdOutfit (idFit: number): Promise<GarmentColorStyleWrapperInterface[]> {
        const sql: string = `
            SELECT garment_id_garment
            FROM outfit_has_garment
            WHERE outfit_id_outfit = ?
        `;

        try {
            const ids: any = await Db.pool.execute(sql, [idFit]);
            if (ids[0].length > 0) {
                const gManage: GarmentManager = new GarmentManager();

                // On instancie le tableau qui recevra les promesses
                const promesses: Promise<GarmentColorStyleWrapperInterface>[] = [];

                // On va chercher chaque garment et on place la promesse dans le tableau
                for (const idGarm of ids[0]) {
                    promesses.push(gManage.getGarmentById(idGarm.garment_id_garment));
                }

                // On résout le tout et on renvoit
                return await Promise.all(promesses);
            } else {
                return [];
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Renvoit tout les outfit d'un user (avec garment, colors, styles associés);
     * @param {number} id l'id de l'user pour lequel on veut récupérer les outfits
     * @returns {Promise<(OutfitGarmentWrapperInterface[]|null)>} peut renvoyer null si aucun outfit n'est trouvé avec cet id
     */
    public async getOutfitsByIdUser (id: number): Promise<(OutfitGarmentWrapperInterface[]|null)> {
        const sql: string = `
            SELECT * FROM outfit
            WHERE user_id_user = ?
        `;

        try {
            const res: any = await Db.pool.execute(sql, [id]);
            if (res[0].length > 0) {

                // On instancie le tableau qui contiendra tout les fits
                const tabFullFit: OutfitGarmentWrapperInterface[] = [];

                for (const fit of res[0]) {

                    // Pour chaque res de la db, on crée un objet Outfit
                    const fitObj: Outfit = new Outfit(fit);

                    // On récupères les garments qui lui sont associés
                    const garms: GarmentColorStyleWrapperInterface[] = await this.getGarmentsByIdOutfit(fitObj.getId());

                    // Et on push tout dans le tableau instancié plus tôt
                    tabFullFit.push({
                        outfit: fitObj,
                        garments: garms
                    });
                }
                
                return tabFullFit;
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
     * @param {number[]} garments la liste des garments à ajoutés à la tenue
     * @returns {Promise<(OutfitGarmentWrapperInterface|null)>}
     */
    public async insertOutfit (outfit: Outfit, garments: number[]): Promise<(OutfitGarmentWrapperInterface|null)> {
        const sql: string = `INSERT INTO outfit VALUES (?, ?, ?, ?, ?)`;
        try {

            // Création de l'outfit lui même
            const insert: any = await Db.pool.execute(sql, [
                outfit.getId(),
                outfit.getLabel(),
                outfit.getCreationDate(),
                outfit.getModificationDate(),
                outfit.getIdUser()
            ]);

            // Si autre chose qu'une seule ligne a été créée, on renvoit null
            if (insert[0].affectedRows === 1) {
                const idNewFit: number = insert[0].insertId;

                // On génère les associations en fonction du nouveau outfit inséré
                if (await this.generateOutfitLinks(idNewFit, garments)) {

                    // On retourne le nouvel outfit complet avec ses garments
                    return await this.getOutfitById(idNewFit);
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

    /**
     * Créer la liaison entre l'outfit et le garment dans outfit_has_garment
     * @param {number} idFit 
     * @param {number} idGarm
     * @returns {Promise<boolean>} true si la liaison a été faite, false dans le cas contraire
     */
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

    /**
     * Main de la création des associations
     * @param {number} idFit 
     * @param {number[]} garments 
     * @returns {Promise<boolean>} true si tout les éléments ont été crées, false si un seul élément n'as pas été crée
     */
    private async generateOutfitLinks (idFit: number, garments: number[]): Promise<boolean> {

        // Le tableau qui contiendra toutes (3) promesses à résoudre
        const result: Promise<boolean>[] = [];

        // Pour chaque id, on l'insert et on pousse sa promesse dans le tableau
        for (const idGarm of garments) {
            result.push(this.insertOutfitGarm(idFit, idGarm));
        }

        // On résout toutes les promesses d'un coup
        const resolved: boolean[] = await Promise.all(result);

        // Si toutes les valeurs du tableau sont à true, on renvoit true
        // Si une seule valeur est à false, on renvoit false
        return resolved.every((val: boolean): boolean => val);
    }
}