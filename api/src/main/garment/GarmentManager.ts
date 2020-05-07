import { Db } from '../../libs/Db';
import { Garment } from './GarmentEntity';
import { ColorInterface, GarmentColorStyleWrapperInterface, StyleInterface } from '@osmo6/models';

/**
 * Manager Garment
 */
export class GarmentManager {
    
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
}