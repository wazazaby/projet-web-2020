import { ManagerUser } from "../Manager/ManagerUser";
import { Context } from 'koa'; 
import { User } from "../Entity/User";

export class CreateAccount {
    public async getResult (): Promise<User> {
        const managerUser: ManagerUser = new ManagerUser();
        const user: User = await managerUser.getUserByMail('test@mail.com');
        return user;
    }
}