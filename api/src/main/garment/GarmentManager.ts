import { Db } from '../../libs/Db';
import { Garment } from './GarmentEntity';
import { ColorInterface, GarmentColorStyleWrapperInterface, StyleInterface, InsertReturnInterface } from '@osmo6/models';
import { promises as fs, Stats } from 'fs';

/**
 * Manager Garment
 */
export class GarmentManager {

    /**
     * Permet de récupérer un garment en fonction de son ID
     * Retourne un objet si un garment existe, null si aucun garment avec cet id
     * @param {number} idGarment 
     * @returns {Promise<GarmentColorStyleWrapperInterface|null>}
     */
    public async getGarmentById (idGarment: number): Promise<(GarmentColorStyleWrapperInterface|null)> {
        const sql: string = 'SELECT * FROM garment WHERE id_garment = ?';
        try {
            const garm: any = await Db.pool.execute(sql, [idGarment]);

            // Si pas de résultat, on renvoit null
            if (garm[0].length > 0) {

                // On crée le garment et on récupére les couleurs ainsi que les styles
                const garmObj: Garment = new Garment(garm[0][0]);
                const resolved: [ColorInterface[], StyleInterface[]] = await Promise.all([
                    this.getColorsByIdGarment(garmObj.getId()), 
                    this.getStylesByIdGarment(garmObj.getId())
                ]);

                // On renvoit l'objet formaté
                return {
                    garment: garmObj,
                    colors: resolved[0],
                    styles: resolved[1]
                };
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }
    
    /**
     * Permet de récupérer la liste des garments d'un utilisateurs, avec pour chaque garment sa liste de styles et de couleurs
     * @param {number} idUser
     * @returns {Promise<GarmentColorStyleWrapperInterface[]>} retourne la liste des garment + styles et couleurs associés, ou un tableau vide si l'utilisateur n'a pas de garment
     */
    public async getGarmentsByIdUser (idUser: number): Promise<GarmentColorStyleWrapperInterface[]> {
        const sql: string = `
            SELECT * FROM garment
            WHERE garment.user_id_user = ?
        `;

        try {

            // Récupération de la liste des garments
            const garms: any = await Db.pool.execute(sql, [idUser]);
            if (garms[0].length > 0) {

                // On crée le tableau qui contiendra les garments avec leurs styles et couleurs
                const tabFullGarment: GarmentColorStyleWrapperInterface[] = [];
                for (const garm of garms[0]) {

                    // Pour chaque garment, on instancie un objet Garment
                    const garmObj: Garment = new Garment(garm);

                    // On appelle les fonctions qui permettent de récupérer les couleurs et styles, et on les résout toutes en même temps avec Promise.all
                    const resolved: [ColorInterface[], StyleInterface[]] = await Promise.all([
                        this.getColorsByIdGarment(garmObj.getId()), 
                        this.getStylesByIdGarment(garmObj.getId())
                    ]);

                    // On pousse le contenu dans le tableau précedemment instancié
                    tabFullGarment.push({
                        garment: garmObj,
                        colors: resolved[0],
                        styles: resolved[1]
                    });
                }

                // À la fin de la boucle, on renvoit la totalité de l'objet
                return tabFullGarment;
            } else {
                return [];
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de récupérer la liste des couleurs associées à un garment
     * @param {number} idGarment
     * @returns {Promise<ColorInterface[]>} Une Promise contenant le tableau de couleurs associées (peut-être vide)
     */
    private async getColorsByIdGarment (idGarment: number): Promise<ColorInterface[]> {
        const sql: string = `
            SELECT color.id_color, color.label_color, color.hex_color, color.rgb_color
            FROM color
            INNER JOIN garment_has_color ON color.id_color = garment_has_color.color_id_color
            WHERE garment_has_color.garment_id_garment = ?
        `;

        try {
            const colors: any = await Db.pool.execute(sql, [idGarment]);
            if (colors[0].length > 0) {
                return colors[0];
            } else {
                return [];
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de récupérer la liste des styles associés à un garment
     * @param {number} idGarment
     * @returns {Promise<StyleInterface[]>} Une Promise contenant le tableau de styles associés (peut-être vide si le garment n'a aucun styles associés)
     */
    private async getStylesByIdGarment (idGarment: number): Promise<StyleInterface[]> {
        const sql: string = `
            SELECT style.id_style, style.label_style
            FROM style
            INNER JOIN garment_has_style ON style.id_style = garment_has_style.style_id_style
            WHERE garment_has_style.garment_id_garment = ?
        `;

        try {
            const styles: any = await Db.pool.execute(sql, [idGarment]);

            // S'il y a des styles, on renvoit le tableau tel-quel
            if (styles[0].length > 0) {
                return styles[0];
            } else {

                // Sinon on renvoit un tableau vide
                return [];
            }
        } catch (e) {
            throw e;
        }
    }


    /**
     * Permet d'insérer un nouveau garment, et faire les liaisons avec les couleurs et styles
     * @param {Garment} garm l'objet garment à insérer
     * @param {number[]|null} colors le tableau contenant les ID de couleurs pour ce nouveau garment, null si aucune couleur n'est choisit
     * @param {number[]|null} styles le tableau contennatn les ID de styles pour ce nouveau garment, null si aucun style n'est choisit
     * @returns {Promise<GarmentColorStyleWrapperInterface|null>}
     */
    public async insertGarment (garm: Garment, colors?: number[], styles?: number[]): Promise<(GarmentColorStyleWrapperInterface|null)> {
        const sql: string = 'INSERT INTO garment VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                garm.getId(),
                garm.getLabel(),
                garm.getUrlImage(),
                garm.getCreationDate(),
                garm.getModificationDate(),
                garm.getIdUser(),
                garm.getIdBrand(),
                garm.getIdSeason(),
                garm.getIdType()
            ]);
            
            // On vérifie s'il y a bien eu une insertion, dans le cas contraire on return null
            if (insert[0].affectedRows === 1) {

                // On récupère l'id du garment qui vient d'être inséré
                const idLastInsertedGarment: number = insert[0].insertId;

                // Pour les couleurs et styles, on vérifie s'ils contiennent bien quelque chose, si c'est le cas on crée les liaisons
                // S'il n'y a pas eu le même nombre d'insert que d'élément dans les tableaux, on renvoit null pour signaler une erreur
                if (colors !== null && colors.length > 0) {
                    if (await this.generateGarmentColorLinks(idLastInsertedGarment, colors) !== colors.length) {
                        return null;
                    }
                }
                
                // Pareil que pour les couleurs
                if (styles !== null && styles.length > 0) {
                    if (await this.generateGarmentStyleLinks(idLastInsertedGarment, styles) !== styles.length) {
                        return null;
                    }
                }

                // Si on arrive ici, ça veut dire que tout c'est bien passé et on retourne le garment en question avec des couleurs et styles associés
                return await this.getGarmentById(idLastInsertedGarment);
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de créer les liaisons entre un garment et ses couleurs
     * @param {number} idGarment l'id du garment à lié
     * @param {number[]} colors le tableau contenant les ID de couleurs à liées au garment
     * @returns {Promise<number>} le total d'élément inséré
     */
    private async generateGarmentColorLinks (idGarment: number, colors: number[]): Promise<number> {
        let total: number = 0;
        if (colors.length > 0) {
            const cSql: string = 'INSERT INTO garment_has_color VALUES (?, ?, ?)';
            try {
                for (const c of colors) {
                    const result: any = await Db.pool.execute(cSql, [null, idGarment, c]);
                    total += result[0].affectedRows;
                }
            } catch (e) {
                throw e;
            }
        }

        return total;
    }

    /**
     * Permet de créer les liaisons entre un garment et ses couleurs
     * @param {number} idGarment l'id du garment à lié
     * @param {number[]} styles le tableau contenant les ID de styles à liés au garment
     * @returns {Promise<number>} le total d'élément inséré
     */
    private async generateGarmentStyleLinks (idGarment: number, styles: number[]): Promise<number> {
        let total: number = 0;
        if (styles.length > 0) {
            const cSql: string = 'INSERT INTO garment_has_style VALUES (?, ?, ?)';
            try {
                
                // La fonction ne marchant pas avec le bulk insert, je suis obligé d'inséré dans une boucle pour chaque élément
                for (const s of styles) {
                    const result: any = await Db.pool.execute(cSql, [null, idGarment, s]);

                    // J'ajoute le nombres de rows affectées au total
                    total += result[0].affectedRows;
                }
            } catch (e) {
                throw e;
            }
        }

        return total;
    }

    /**
     * Permet de supprimer un garment ainsi que ses liaisons en fonction de son id
     * @param {number} idGarment
     * @returns {boolean} true si la suppression s'est bien passée, false s'il y a eu une erreur
     */
    public async deleteGarmentById (idGarment: number): Promise<boolean> {

        // On récupère l'objet du garment
        const garm: (GarmentColorStyleWrapperInterface|null) = await this.getGarmentById(idGarment);
        if (garm !== null) {

            const garmObj: Garment = new Garment(garm.garment);
            try {

                // Si le fichier existe bien, on le supprime
                const blob: Stats = await fs.lstat(`../front/src${garmObj.getUrlImage()}`);
                if (blob.isFile()) {
                    await fs.unlink(`../front/src${garmObj.getUrlImage()}`);
                }

                if (await this.deleteGarmentLinksByIdGarment(idGarment)) {
                    try {
        
                        // Une fois que les liaisons sont supprimées, on delete le garment en lui même et on renvoit true si une seule ligne a bien été affectée
                        const del: any = await Db.pool.execute('DELETE FROM garment WHERE id_garment = ?', [idGarment]);
                        if (del[0].affectedRows === 1) {
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
            } catch (e) {
                throw e;
            }
        } else {
            return false;
        }
    }

    /**
     * Supprime les liaisons du garment (couleur et style) en fonction de son ID
     * @param {number} idGarment 
     * @returns {boolean} true si les liaisons on bien été supprimées, false dans le cas contraire
     */
    private async deleteGarmentLinksByIdGarment (idGarment: number): Promise<boolean> {

        // On fait un delete avec un INNER JOIN puisque qu'un garment a forcément une couleur et un style au moins
        const sql: string = `
            DELETE c.*, s.*
            FROM garment_has_color AS c
            INNER JOIN garment_has_style AS s ON c.garment_id_garment = s.garment_id_garment
            WHERE c.garment_id_garment = ?
        `;

        try {
            const del: any = await Db.pool.execute(sql, [idGarment]);

            // On retourn true si plusieurs lignes on bien été supprimées, false si <= à 0
            if (del[0].affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de mettre à jour un Garment en prenant comme param l'objet Garment déjà mis à jour à enregistrer en BDD ainsi que ses nouvelles couleurs et nouveaux styles
     * @param {Garment} updatedGarm l'objet Garment mis à jour
     * @param {number[]} newStyles le tableau avec les nouveaux styles
     * @param {number[]} newColors le tableau avec les nouvelles couleurs
     * @returns {Promise<(GarmentColorStyleWrapperInterface|null)>} retourne l'objet du garment mis à jour si tout s'est bien passé, null si erreur
     */
    public async updateGarment (updatedGarm: Garment, newStyles?: number[], newColors?: number[]): Promise<(GarmentColorStyleWrapperInterface|null)> {

        // En premier lieu, on supprime les liens actuels du garment vers colors et styles
        if (await this.deleteGarmentLinksByIdGarment(updatedGarm.getId())) {

            // Création du SQL de mise à jour qui prendra les nouvelles valeurs
            const sql: string = `
                UPDATE garment
                SET
                    label_garment = ?,
                    url_img_garment = ?,
                    modification_date_garment = ?,
                    brand_id_brand = ?,
                    season_id_season = ?,
                    type_id_type = ?
                WHERE id_garment = ?
            `;

            try {

                // On lance l'update
                const update: any = await Db.pool.execute(sql, [
                    updatedGarm.getLabel(),
                    updatedGarm.getUrlImage(),
                    updatedGarm.getModificationDate(),
                    updatedGarm.getIdBrand(),
                    updatedGarm.getIdSeason(),
                    updatedGarm.getIdType(),
                    updatedGarm.getId()
                ]);

                // Si une seule ligne a bien été affectée, on passe à la suite
                if (update[0].affectedRows === 1) {

                    // On générer les liens entre le garment et ses couleurs, on vérifie en premier que le tableau contient quelque chose
                    if (newColors !== null && newColors.length > 0) {

                        // On vérifie si le nombre d'insert correspond au nombre d'entrées dans le nouveau tableau de couleurs pour savoir si tout s'est bien passé
                        if (await this.generateGarmentColorLinks(updatedGarm.getId(), newColors) !== newColors.length) {

                            // Dans le cas contraire, on retourne null
                            return null;
                        }
                    }
                    
                    // Pareil que pour les couleurs
                    if (newStyles !== null && newStyles.length > 0) {
                        if (await this.generateGarmentStyleLinks(updatedGarm.getId(), newStyles) !== newStyles.length) {
                            return null;
                        }
                    }

                    // Si on arrive ici, ça veut dire que l'update s'est bien passé et que les liens on été créés
                    // On peut donc renvoyer le garment mis à jour
                    return await this.getGarmentById(updatedGarm.getId());
                } else {

                    // Dans le cas contraire, ça veut dire que l'update ne s'est pas fait alors on renvoit null
                    return null;
                }
            } catch (e) {
                throw e;
            }
        } else {
            return null;
        }
    }
}