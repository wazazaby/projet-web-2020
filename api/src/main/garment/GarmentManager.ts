import { Db } from '../../libs/Db';
import { Garment } from './GarmentEntity';
import { InsertReturnInterface, GarmentInterface, ColorInterface, StyleInterface } from '@osmo6/models'

/**
 * Manager Garment
 */
export class GarmentManager {
    public async getGarmentsByIdUser (idUser: number): Promise<any | null> {
        const sql: string = `
            SELECT garment.*, 
            GROUP_CONCAT(color.id_color, ';', color.label_color, ';', color.hex_color, ';', color.rgb_color SEPARATOR '@') as dataColor,
            GROUP_CONCAT(style.id_style, ';', style.label_style SEPARATOR '@') as dataStyle
            FROM garment
            LEFT JOIN garment_has_color ON garment.id_garment = garment_has_color.garment_id_garment
            LEFT JOIN color ON garment_has_color.color_id_color = color.id_color
            LEFT JOIN garment_has_style ON garment.id_garment = garment_has_style.garment_id_garment
            LEFT JOIN style ON garment_has_style.style_id_style = style.id_style
            WHERE garment.user_id_user = 30
            GROUP BY garment.id_garment
        `;

        try {
            const garms: any = await Db.pool.execute(sql, [idUser]);
            if (garms[0].length > 0) {
                return garms[0];
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }
}