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
     * @returns {Promise<OutfitGarmentWrapperInterface[]>} peut renvoyer null si aucun outfit n'est trouvé avec cet id
     */
    public async getOutfitsByIdUser (id: number): Promise<OutfitGarmentWrapperInterface[]> {
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
                return [];
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

    /**
     * Permet de supprimer les liens entre l'oufit (id) et ses garments (table outfit_has_garment)
     * @param {number} idFit l'id de l'outfit
     * @returns {Promise<boolean>}
     */
    private async deleteOufitGarmentLinks (idFit: number): Promise<boolean> {
        const sql: string = 'DELETE FROM outfit_has_garment WHERE outfit_id_outfit = ?';
        try {
            const poped: any = await Db.pool.execute(sql, [idFit]);

            // Comme un outfit est toujours composé de 3 garments, on vérifie si les 3 ont bien été supprimés
            if (poped[0].affectedRows === 3 && poped[0].serverStatus === 2) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de supprimer un outfit en fonction de son id
     * @param {number} id l'id de l'outfit à supprimer
     * @returns {Promise<boolean>} true si l'outfit à bien été supprimé, false dans le cas contraire
     */
    public async deleteOufitById (id: number): Promise<boolean> {

        // On supprime d'abord les liens pour éviter les erreurs de FK
        if (await this.deleteOufitGarmentLinks(id)) {
            try {

                // On exécute la requête en lui passant l'id de la tenue à supprimer
                const del: any = await Db.pool.execute('DELETE FROM outfit WHERE id_outfit = ?', [id]);

                // Si une seule ligne a été supprimée et que le serveur n'a pas renvoyé d'erreurs
                if (del[0].affectedRows === 1 && del[0].serverStatus === 2) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                throw e;
            }
        } else {
            return false;
        }
    }

    /**
     * Permet de mettre à jour un outfit et de retourner son nouvel objet
     * @param {Outfit} out l'objet outfit mis à jour dans le controller
     * @param {number[]} newGarms les id des nouveaux garments qui seront associés à cet outfit
     * @returns {Promise<(OutfitGarmentWrapperInterface|null)>}
     */
    public async updateOutfit (out: Outfit, newGarms: number[]): Promise<(OutfitGarmentWrapperInterface|null)> {

        // On supprime d'abord ses liens avec les garments pour la FK
        if (await this.deleteOufitGarmentLinks(out.getId())) {
            const sql: string = `
                UPDATE outfit
                SET
                    label_outfit = ?,
                    modification_date_outfit = ?
                WHERE id_outfit = ?
            `;

            try {

                // On met à jour l'entité outfit
                const res: any = await Db.pool.execute(sql, [out.getLabel(), out.getModificationDate(), out.getId()]);
                if (res[0].affectedRows === 1 && res[0].serverStatus === 2) {

                    // On regénère les liens avec les nouveaux garments
                    if (await this.generateOutfitLinks(out.getId(), newGarms)) {

                        // Si tout s'est bien passé on renvoit le nouvel outfit
                        return await this.getOutfitById(out.getId());
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch (e) {
                throw e;
            }
        } else {
            return null;
        }
    }

    /**
     * Permet de récupérer l'id d'un garm en fonction du style souhaité
     * @param {number} idStyle 
     * @param {number} idUser 
     * @param {string} type => top || pants || shoes
     * @returns {Promise<number>} l'id du garm ou 0 s'il n'y en a pas
     */
    public async getRandomGarmByStyle (idStyle: number, idUser: number, type: string): Promise<number> {
        let sql: string = `
            SELECT id_garment 
            FROM garment
            INNER JOIN garment_has_style ON garment.id_garment = garment_has_style.garment_id_garment
            WHERE garment_has_style.style_id_style = ?
            AND garment.user_id_user = ?
        `;

        // En fonction du type, on va chercher le bon type de vêtement
        switch (type) {
            case 'top':
                sql += ' AND garment.type_id_type IN (7, 8, 9, 10, 11, 12, 13, 14)';
                break;

            case 'pants':
                sql += ' AND garment.type_id_type IN (1, 2, 3, 4, 5, 6)';
                break;

            case 'shoes':
                sql += ' AND garment.type_id_type IN (15, 16, 17, 18)'
                break;
        }

        sql += ' ORDER BY RAND()';
        sql += ' LIMIT 1';

        try {
            const res: any = await Db.pool.execute(sql, [idStyle, idUser]);
            if (res[0].length === 1) {
                return res[0][0].id_garment;
            } else {
                return 0;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de récupérer l'id d'un garm en fonction de la couleur souhaitée
     * @param {number} idColor 
     * @param {number} idUser 
     * @param {string} type => top || pants || shoes
     * @returns {Promise<number>} l'id du garm ou 0 s'il n'y en a pas
     */
    public async getRandomGarmByColor (idColor: number, idUser: number, type: string): Promise<number> {
        let sql: string = `
            SELECT id_garment 
            FROM garment
            INNER JOIN garment_has_color ON garment.id_garment = garment_has_color.garment_id_garment
            WHERE garment_has_color.color_id_color = ?
            AND garment.user_id_user = ?
        `;

        switch (type) {
            case 'top':
                sql += ' AND garment.type_id_type IN (7, 8, 9, 10, 11, 12, 13, 14)';
                break;

            case 'pants':
                sql += ' AND garment.type_id_type IN (1, 2, 3, 4, 5, 6)';
                break;

            case 'shoes':
                sql += ' AND garment.type_id_type IN (15, 16, 17, 18)'
                break;
        }

        sql += ' ORDER BY RAND()';
        sql += ' LIMIT 1';

        try {
            const res: any = await Db.pool.execute(sql, [idColor, idUser]);
            if (res[0].length === 1) {
                return res[0][0].id_garment;
            } else {
                return 0;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de récupérer l'id d'un garm en fonction de la saison souhaitée
     * @param {number} idSeason 
     * @param {number} idUser 
     * @param {string} type => top || pants || shoes
     * @returns {Promise<number>} l'id du garm ou 0 s'il n'y en a pas
     */
    public async getRandomGarmBySeason (idSeason: number, idUser: number, type: string): Promise<number> {
        let sql: string = `
            SELECT id_garment
            FROM garment
            WHERE user_id_user = ?
            AND season_id_season = ?
        `;

        switch (type) {
            case 'top':
                sql += ' AND garment.type_id_type IN (7, 8, 9, 10, 11, 12, 13, 14)';
                break;

            case 'pants':
                sql += ' AND garment.type_id_type IN (1, 2, 3, 4, 5, 6)';
                break;

            case 'shoes':
                sql += ' AND garment.type_id_type IN (15, 16, 17, 18)'
                break;
        }

        sql += ' ORDER BY RAND()';
        sql += ' LIMIT 1';

        try {
            const res: any = await Db.pool.execute(sql, [idUser, idSeason]);
            if (res[0].length === 1) {
                return res[0][0].id_garment;
            } else {
                return 0;
            }
        } catch (e) {
            throw e;
        }
    }
}