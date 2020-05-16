import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BridgeService } from 'src/app/services/bridge.service';
import { ErrorInterface, UserInterface } from '@osmo6/models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { // contient les var du component

    /** Lorque l'utilisateur click sur le btn connexion */
    public isLogin = false;

    /** Lorque l'utilisateur click sur le btn inscription */
    public isRegistered = false;

    /** Lorsque l'utilisateur arrive sur le site */
    public isHome = true;

    /** */
    public hide = true;

    /** Token utilisateur */
    public token: string;

    /** Formulaire de connexion */
    formConnect: FormGroup = this.formBuild.group({
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        pass: new FormControl('', [Validators.required]),
    });

    /** Formulaire d'inscription */
    formResistered: FormGroup = this.formBuild.group({
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        name: new FormControl('', [Validators.required]),
        pass: new FormControl('', [Validators.required]),
        passConfirm: new FormControl('', [Validators.required]),
    });

    constructor(private formBuild: FormBuilder,
                private stateService: StatesService,
                private bridgeService: BridgeService,
                private route: Router,
                private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(res => {
            this.token = res.t;

            // Si on est sur la route d'auth et qu'on a un token en paramètre, on lance l'activation du compte
            if (Object.keys(res).length > 0 && res.t !== undefined) {
                this.bridgeService.activateUser(res.t).subscribe(response => {
                    if (this.stateService.checkStatus(response.status)) {

                        // On redirige, on préremplie le champ mail et on affiche un message de succès
                        this.route.navigate(['./auth']);
                        this.formConnect.get('email').setValue(response.data.email);
                        this.stateService.openSnackBar('Votre compte a bien été activé, vous pouvez maintenant vous connecter', null);
                        this.effectBtn('connexion');
                    } else {
                        const err: ErrorInterface = {
                            code: response.status,
                            message: response.message,
                            route: `${environment.apiUrl}user/activate/${this.token}`
                        };

                        this.stateService.errors = err;
                    }
                });
            }
        });
    }

   /**
    * Permet de switcher entre l'inscrip^tion/la connexion ou la page d'accueil
    * @param value string
    */
    effectBtn(value: string) {
        switch (value) {
            case 'inscription':
            this.isHome = false;
            this.isLogin = false;
            this.isRegistered = true;
            break;

            case 'connexion':
            this.isHome = false;
            this.isLogin = true;
            this.isRegistered = false;
            break;

            case 'retour':
            this.isHome = true;
            this.isLogin = false;
            this.isRegistered = false;
            break;

            default:
            break;
        }
    }

   /**
    * Permet à l'utilisateur de se connecter au site
    */
    login() {
        if (this.formConnect.valid) {
            const email = this.formConnect.value.email;
            const pass = this.formConnect.value.pass;
            // const email = 'mail@mail.com';
            // const pass = 'motdepasse';

            this.bridgeService.login(email, pass).subscribe(res => {
                if (this.stateService.checkStatus(res.status)) {
                    const data: UserInterface = res.data;
                    this.stateService.userProfil = data;
                    this.bridgeService.getGarmentUser(data.id_user);
                    this.stateService.login();
                    localStorage.clear();
                } else {
                    const err: ErrorInterface = {code: res.status, message: res.message, route: environment.apiUrl + 'user/login'};
                    this.stateService.errors = err;
                    console.log('Login Error', false);
                }
            });
        } else {
            this.formConnect.markAllAsTouched();
        }
    }

    register() {
        if (this.formResistered.valid) {
            this.bridgeService.register({
                name: this.formResistered.value.name,
                mail: this.formResistered.value.email,
                pass: this.formResistered.value.pass
            }).subscribe(res => {
                if (this.stateService.checkStatus(res.status)) {
                    this.stateService.openSnackBar('Un mail d\'activation vous a été envoyé', null);
                } else {
                    const err: ErrorInterface = {
                        code: res.status,
                        message: res.message,
                        route: `${environment.apiUrl}user/add`
                    };

                    this.stateService.errors = err;
                    this.stateService.openSnackBar(err.message, null);
                }
            });
        } else {
            this.formResistered.markAllAsTouched();
        }
    }
}
