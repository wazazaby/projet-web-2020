export interface UserModel {
    id_user?: number;
    name_user: string;
    email_user: string;
    pass_user?: string;
    actif_user: number;
    rgpd_user: number;
    token_user?: string;
    img_user?: string;
    create_date_user?: number;
    modification_date_user?: number;
}