import { GarmentManager } from './GarmentManager';
import { Context } from 'koa';
import { Garment } from './GarmentEntity';
import { Body } from '../../libs/Body';
import { GarmentColorStyleWrapperInterface, InsertReturnInterface } from '@osmo6/models';

type UploadedFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
};

export class GarmentController {
    private _manager: GarmentManager;

    /**
     * Constructeur de GarmentController
     */
    constructor () {
        this._manager = new GarmentManager;
    }

    /**
     * Permet de récupérer tout les vetement d'un utilisateur en fonction de son id
     * @param {Context} ctx 
     */
    public async getAllGarmentsByIdUser (ctx: Context): Promise<void> {
        const idUser: number = ctx.params.idUser;

        // Vérification de l'auth de l'user
        if (ctx.session.auth) {
            if (ctx.session.auth.id_user !== Number(idUser)) {
                return ctx.throw(403, "Vous n'avez pas accès à ce contenu");
            }
        } else {
            return ctx.throw(403, "Vous n'avez pas accès à ce contenu");
        }

        const garms: GarmentColorStyleWrapperInterface[] = await this._manager.getGarmentsByIdUser(idUser);
        ctx.body = new Body(200, "", garms);
    }

    /**
     * Créer un garment et retourne le garment inséré avec ses liaisons couleurs / styles
     * @param {Context} ctx 
     */
    public async createGarment (ctx: Context): Promise<void> {

        // Récupération du fichier et des couleurs / styles
        const file: UploadedFile = ctx.file;
        const colors: number[] = ctx.request.body.id_color;
        const styles: number[] = ctx.request.body.id_style;

        // Création du garment
        const newGarm: Garment = new Garment({
            id_garment: null,
            label_garment: ctx.request.body.label_garment,
            url_img_garment: `${file.destination}${file.filename}`,
            creation_date_garment: Math.floor(Date.now() / 1000),
            modification_date_garment: null,
            user_id_user: ctx.request.body.user_id_user,
            brand_id_brand: ctx.request.body.brand_id_brand,
            season_id_season: ctx.request.body.season_id_season,
            type_id_type: ctx.request.body.type_id_type
        });

        // On lance l'ajout, si ça marche on renvoit l'objet du garment en question, sinon on throw une erreur HTTP
        try {
            const result: GarmentColorStyleWrapperInterface|null = await this._manager.insertGarment(newGarm, colors, styles);
            if (result === null) {
                ctx.throw(400, "Problème lors de la création de votre vêtement");
            } else {
                ctx.body = new Body(200, '', result);
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Permet de supprimer un garment, retourne un status 200 ou lance une erreur HTTP 400 si ça n'a pas marché
     * @param {Context} ctx 
     */
    public async deleteGarment (ctx: Context): Promise<void> {
        const idGarment: number = Number(ctx.params.idGarment);
        if (await this._manager.deleteGarmentById(idGarment)) {
            ctx.body = new Body(200, "Vêtement supprimé avec succes");
        } else {
            ctx.throw(400, "Problème lors de la suppression de votre vêtement");
        }
    }
}