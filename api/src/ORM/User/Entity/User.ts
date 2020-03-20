export class User {
    private id: number;
    private email: string;
    private password: string;
    private name: string;
    private actif: number;
    private rgpd: number;
    private token: string;

    constructor (e: string, p: string, n: string) {
        this.email = e;
        this.password = p;
        this.name = n;
    }

    public getEmail (): string {
        return this.email;
    }

    public getPassword (): string {
        return this.password;
    }

    public getName (): string {
        return this.name;
    }

    public setPassword (newPass: string): void {
        this.password = newPass;
    }

    public setName (newName: string): void {
        this.name = newName;
    }
}