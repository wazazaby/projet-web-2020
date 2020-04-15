import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GarmentInterface } from '@osmo6/models';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-modal-add-garment',
  templateUrl: './modal-add-garment.component.html',
  styleUrls: ['./modal-add-garment.component.scss']
})
export class ModalAddGarmentComponent implements OnInit {

  constructor(private formBuild: FormBuilder,
              private stateService: StatesService,
              @Inject(MAT_DIALOG_DATA) public data: {userId: number}) { }

  // image
  file: File;
  // url temporaire pour la preview
  url: any;

  // Champs obligatoire pour la création d'un vêtement
  formGarment: FormGroup;

  // Etape de création d'un vêtement
  stepOne: boolean;

  // Saison
  season = this.stateService.season;

  ngOnInit() {
    this.stepOne = true;
    this.formGarment = this.formBuild.group({
      label_garment: ['', Validators.required],
      url_img_garment: ['/assets/' + this.data.userId + '/'],
      creation_date_garment: [new Date().getTime()],
      modification_date_garment: [new Date().getTime()],
      user_id_user: [this.data.userId, Validators.required],
      brand_id_brand: [''],
      season_id_season: ['', Validators.required],
      style: [''],
      color: ['']
    });
  }

  uploadFile(event) {
    this.url = null;
    this.file = event[0];
    // Preview image
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = (evt) => {
      if (evt.target) {
        this.url = evt.target.result;
      }

      if (this.url && this.file) {
        this.stepOne = false;
      }
    };

    console.log(this.url, this.file, this.stepOne);
  }

  removeFile() {
    this.file = null;
    this.url = null;
    this.stepOne = true;
  }

  sendFile() {
    console.log('file', this.file);
    const dataGarment: GarmentInterface = this.formGarment.value;
    const formData = new FormData();
    formData.append('file', this.file);
    // data.file = formData;;

    console.log(formData, dataGarment);
  }


}
