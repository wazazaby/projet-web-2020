//import User from '../Entity/User';

export class ManagerUser {
    // Pour le moment, à définir suivant le type de l'objet MySQLi
    private connexion: any;

    constructor (c: any) {
        this.connexion = c;
    }

    public userExists (email: string): boolean {
        // SQL pour vérifier si l'utilisateur existe déjà

        return true;
    }

    // Au lieu de any, la fonction retournera l'interface User
    public getUserById (id: number): any {
        
        return {
            name: 'Teddy',
            password: '1234',
            email: 'bbb@gmail.com' 
        }
    }
}