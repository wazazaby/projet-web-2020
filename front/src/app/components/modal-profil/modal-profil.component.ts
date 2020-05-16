import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-profil',
  templateUrl: './modal-profil.component.html',
  styleUrls: ['./modal-profil.component.scss']
})
export class ModalProfilComponent implements OnInit {

  isDisabled = true;
  isDelete = false;

  /** base url upload image */
  urlUpload = environment.apiUpload;

  formUser: FormGroup = this.formBuild.group({
    name: new FormControl(this.data.user.name_user, [ Validators.required]),
    email: new FormControl(this.data.user.email_user,
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuild: FormBuilder) { }

  ngOnInit() {
    this.formUser.get('name').disable();
    this.formUser.get('email').disable();
  }

  /**
   * Permet de supprimer le compte utilisateur
   * @param id; number
   * @param action: number {0=ouvre la modal, 1=annuler, 2=annule}
   */
  deleteProfil(id: number, action: number) {
    switch (action) {
      case 0:
        this.isDelete = true;
        console.log('ouvre la modal');
        break;
      case 1:
        console.log('supprime le user ', id);
        break;
      case 2:
        this.isDelete = false;
        console.log('annule la suppréssion');
        break;
    }
    // console.log('delete', id);
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
