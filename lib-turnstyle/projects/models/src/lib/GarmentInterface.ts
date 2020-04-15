import { ColorInterface } from './ColorInterface'; 
import { StyleInterface } from './StyleInterface';  
export interface GarmentInterface {   
    id_garment?: number;   
    label_garment: string;   
    url_img_garment: string;   
    creation_date_garment: number;   
    modification_date_garment: number;   
    user_id_user: number;   
    brand_id_brand: number;   
    season_id_season: number;   
    style?: StyleInterface[];  
    color?: ColorInterface[]; 
}