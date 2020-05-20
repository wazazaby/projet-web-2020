import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BridgeService } from 'src/app/services/bridge.service';
import { Router } from '@angular/router';
import { StatesService } from 'src/app/services/states.service';
import { ErrorInterface } from '@osmo6/models';

@Component({
  selector: 'app-modal-profil',
  templateUrl: './modal-profil.component.html',
  styleUrls: ['./modal-profil.component.scss']
})
export class ModalProfilComponent implements OnInit {

  isDisabled = true;
  isDelete = false;

  /** base url upload image */
  urlUpload = environment.apiUrlBase;

  formUser: FormGroup = this.formBuild.group({
    name: new FormControl('', [ Validators.required]),
    email: new FormControl('',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuild: FormBuilder,
              private bridgeService: BridgeService,
              private stateService: StatesService,
              private route: Router) { }

  ngOnInit() {
    if (this.data && this.data.user) {
      this.formUser.get('name').setValue(this.data.user.name_user);
      this.formUser.get('email').setValue(this.data.user.email_user);
    }
    this.formUser.get('name').disable();
    this.formUser.get('email').disable();
  }

  /**
   * Permet de supprimer le compte utilisateur
   * @param id; number
   * @param action: number {0=ouvre la modal, 1=supprime, 2=annule}
   */
  deleteProfil(id: number, action: number) {
    switch (action) {
      case 0:
        this.isDelete = true;
        // ouvre la modal
        break;
      case 1:
        // supprime le user
        this.bridgeService.removeUser(id).subscribe((res) => {
          if (this.stateService.checkStatus(res.status)) {
            localStorage.clear();
            this.stateService.isLogin = false;
            this.route.navigate(['/auth']);
            this.stateService.openSnackBar(res.message, null);
          } else {
            const err: ErrorInterface = {
                code: res.status,
                message: res.message,
                route: environment.apiUrlService + '/api/user/' + id
            };

            this.stateService.openSnackBar(err.message, null, 'err');
            this.stateService.errors = err;
          }
        });
        break;
      case 2:
        this.isDelete = false;
        // annule la suppréssion
        break;
    }
  }

  setProfil(id: number, b: boolean) {
    this.isDisabled = !this.isDisabled;
    console.log('set', id, b);
    if (!b) {
      console.log('save');
    }
    console.log('set');
  }

  save() {
    console.log('save');
  }

  date(d: number) {
    const date = new Date(d * 1000);
    return date;
  }

}
