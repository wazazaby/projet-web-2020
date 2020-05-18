import { GarmentManager } from './GarmentManager';
import { Context } from 'koa';
import { Garment } from './GarmentEntity';
import { Body } from '../../libs/Body';
import { GarmentColorStyleWrapperInterface } from '@osmo6/models';
import { promises as fs } from 'fs';
import { Auth } from '../../libs/Auth'; 

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
        const idUser: number = Number(ctx.params.idUser);

        // Vérification de l'auth de l'user
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        const garms: GarmentColorStyleWrapperInterface[] = await this._manager.getGarmentsByIdUser(idUser);
        ctx.body = new Body(200, "OK", garms);
        return;
    }

    /**
     * Créer un garment et retourne le garment inséré avec ses liaisons couleurs / styles
     * @param {Context} ctx 
     */
    public async createGarment (ctx: Context): Promise<void> {

        // On vérifie si l'utilisateur est authentifié
        const idUser: number = Number(ctx.request.body.user_id_user);
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        // Récupération du fichier et des couleurs / styles
        const file: UploadedFile = ctx.file;
        const colors: number[] = JSON.parse(ctx.request.body.color);
        const styles: number[] = JSON.parse(ctx.request.body.style);

        // Création du garment
        const newGarm: Garment = new Garment({
            id_garment: null,
            label_garment: ctx.request.body.label_garment,
            url_img_garment: `/uploads/${file.filename}`,
            creation_date_garment: Math.floor(Date.now() / 1000),
            modification_date_garment: null,
            user_id_user: idUser,
            brand_id_brand: ctx.request.body.brand_id_brand,
            season_id_season: ctx.request.body.season_id_season,
            type_id_type: ctx.request.body.type_id_type
        });

        // On lance l'ajout, si ça marche on renvoit l'objet du garment en question, sinon on throw une erreur HTTP
        const result: (GarmentColorStyleWrapperInterface|null) = await this._manager.insertGarment(newGarm, colors, styles);

        const status: number = result === null ? 400 : 200;
        const message: string = result === null 
            ? "Il y a eu un problème lors de l'ajout de votre vêtement, merci de réessayer" 
            : "Votre vêtement a bien été crée";
        ctx.body = new Body(status, message, result);
        return;
    }

    /**
     * Permet de supprimer un garment, retourne un status 200 ou lance une erreur HTTP 400 si ça n'a pas marché
     * @param {Context} ctx
     */
    public async deleteGarment (ctx: Context): Promise<void> {

        // Vérification de l'auth de l'user
        const idUser: number = Number(ctx.params.idUser);
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        const idGarment: number = Number(ctx.params.idGarment);
        const del: boolean = await this._manager.deleteGarmentById(idGarment);
        const status: number = del ? 200 : 400;
        const message: string = del 
            ? "Votre vêtement a bien été supprimé" 
            : "Il y a eu un problème lors de la suppression de votre vêtement, merci de réessayer";
        ctx.body = new Body(status, message);
        return;
    }

    /**
     * Permet de modifier / mettre à jour un garment, HTTP 200 si OK, 400+ si erreur
     * @param {Context} ctx
     */
    public async updateGarment (ctx: Context): Promise<void> {
        const requestBody: any = ctx.request.body;
        const idGarment: number = Number(requestBody.id_garment);
        const idUser: number = Number(requestBody.user_id_user);

        // Vérification de l'authentification
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        // On récupère le garment entier
        const currentGarment: (GarmentColorStyleWrapperInterface|null) = await this._manager.getGarmentById(idGarment);

        if (currentGarment !== null) {

            // On instancie un objet garment qui sera modifié plus bas
            const garmObj: Garment = new Garment(currentGarment.garment);

            // Récupération des nouvelles couleurs et styles dans la requette
            const newColors: number[] = JSON.parse(requestBody.color);
            const newStyles: number[] = JSON.parse(requestBody.style);

            // Récupération de la nouvelle image
            const file: UploadedFile = ctx.file;

            // On vérifie si l'user envoit une nouvelle image
            if (file !== undefined) {
                try {

                    // On vérifie si l'image actuelle existe et si c'est bien un fichier valide
                    const imageExists: boolean = await fs.stat(`.${garmObj.getUrlImage()}`)
                        .then(res => res.isFile())
                        .catch(e => {
                            if (e.code === 'ENOENT') {
                                return false;
                            }

                            throw e;
                        });

                    // Si c'est le cas, on la supprime
                    if (imageExists) {
                        await fs.unlink(`.${garmObj.getUrlImage()}`);
                    }

                    // On passe la nouvelle image à l'objet
                    garmObj.setUrlImage(`/uploads/${file.filename}`)
                } catch (e) {
                    ctx.body = new Body(400, e);
                    return;
                }
            }

            // On met à jour l'objet du garment en question avec les nouvelles données
            garmObj
                .setLabel(requestBody.label_garment)
                .setModificationDate(Math.floor(Date.now() / 1000))
                .setIdBrand(requestBody.brand_id_brand)
                .setIdSeason(requestBody.season_id_season)
                .setIdType(requestBody.type_id_type);

            // On renvoie l'objet au manager pour la mise à jour, retourne un objet garment complet si tout s'est bien passé ou null si erreur
            const newObj: (GarmentColorStyleWrapperInterface|null) = await this._manager.updateGarment(garmObj, newStyles, newColors);
            const status: number = newObj === null ? 400 : 200;
            const message: string = newObj === null 
                ? "Il y a eu un problème lors de la modification de votre vêtement, merci de réessayer"
                : "Votre vêtement à bien été mis à jour"
            ctx.body = new Body(status, message, newObj);
            return;
        } else {
            ctx.body = new Body(403, "Ce vêtement n'existe pas");
            return;
        }
    }
}