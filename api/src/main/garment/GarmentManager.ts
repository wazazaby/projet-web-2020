import { Db } from '../../libs/Db';
import { Garment } from './GarmentEntity';
import { InsertReturnInterface, GarmentInterface, ColorInterface, StyleInterface } from '@osmo6/models';

/**
 * Manager Garment
 */
export class GarmentManager {
    
    public async getGarmentsByIdUser (idUser: number): Promise<Garment[]|null> {
        const sql: string = `
            SELECT garment.*, 
            GROUP_CONCAT(DISTINCT color.id_color, ';', color.label_color, ';', color.hex_color, ';', color.rgb_color SEPARATOR '@') as has_colors,
            GROUP_CONCAT(DISTINCT style.id_style, ';', style.label_style SEPARATOR '@') as has_styles
            FROM garment
            INNER JOIN garment_has_color ON garment.id_garment = garment_has_color.garment_id_garment
            INNER JOIN color ON garment_has_color.color_id_color = color.id_color
            INNER JOIN garment_has_style ON garment.id_garment = garment_has_style.garment_id_garment
            INNER JOIN style ON garment_has_style.style_id_style = style.id_style
            WHERE garment.user_id_user = ?
            GROUP BY garment.id_garment
        `;

        try {
            const garms: any = await Db.pool.execute(sql, [idUser]);
            if (garms[0].length > 0) {
                return garms[0].map((garm: any) => {
                    garm.has_colors = this.mapColorStringToInterface(garm.has_colors);
                    garm.has_styles = this.mapStyleStringToInterface(garm.has_styles);
                    return new Garment(garm);
                });
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    public mapColorStringToInterface (strFromDb: string): ColorInterface[]|null {
        if (strFromDb.length > 0) {
            const splitted: string[] = strFromDb.split('@');
            if (splitted.length > 0) {
                let arr: ColorInterface[] = [];
                splitted.forEach((oneData: string) => {
                    let id: any, label: string, hex: string, rgb: string;
                    [id, label, hex, rgb] = oneData.split(';');
                    arr.push({id_color: parseInt(id), label_color: label, hex_color: hex, rgb_color: rgb});
                });

                return arr;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public mapStyleStringToInterface (strFromDb: string): StyleInterface[]|null {
        if (strFromDb.length > 0) {
            const splitted: string[] = strFromDb.split('@');
            if (splitted.length > 0) {
                let arr: StyleInterface[] = [];
                splitted.forEach((oneData: string) => {
                    let id: any, label: string;
                    [id, label] = oneData.split(';');
                    arr.push({id_style: parseInt(id), label_style: label});
                });

                return arr;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}