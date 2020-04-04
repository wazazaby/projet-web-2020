//import { createTransport } from 'nodemailer';
import * as nodeMailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer');

export class Mailer {
    private _transporter: Mail;
    private _mailOptions: Mail.Options;

    constructor (desti: string, obj: string, msg: string) {
        this._transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_MAIL,
                pass: process.env.MAIL_PASSWORD
            }
        });
        
        this._mailOptions = {
            from: 'projet.web.turnstyle@gmail.com',
            to: desti,
            subject: obj,
            html: msg
        };
    }

    async sendMail (): Promise<nodeMailer.SentMessageInfo> {
        try {
            return await this._transporter.sendMail(this._mailOptions);
        } catch (e) {
            throw e;
        }
    }
}