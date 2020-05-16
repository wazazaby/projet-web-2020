import { GlobalReturnInterface } from '@osmo6/models';

export class Body implements GlobalReturnInterface {
    public status: number;
    public message: string;
    public data?: any;

    constructor (status: number, message: string, data?: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}