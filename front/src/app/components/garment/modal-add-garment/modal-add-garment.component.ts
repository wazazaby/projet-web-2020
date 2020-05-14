import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GarmentInterface, SeasonInterface, TypeInterface, StyleInterface, BrandInterface, ColorInterface } from '@osmo6/models';
import { StatesService } from 'src/app/services/states.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BridgeService } from 'src/app/services/bridge.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-add-garment',
  templateUrl: './modal-add-garment.component.html',
  styleUrls: ['./modal-add-garment.component.scss']
})
export class ModalAddGarmentComponent implements OnInit {

  constructor(private formBuild: FormBuilder,
              private stateService: StatesService,
              private bridgeService: BridgeService,
              @Inject(MAT_DIALOG_DATA) public data: {userId: number}) { }

  // image
  file: File;
  // url temporaire pour la preview
  url: any;

  // Champs obligatoire pour la création d'un vêtement
  formGarment: FormGroup = this.formBuild.group({
    label_garment: new FormControl('', [Validators.required]),
    user_id_user: [this.data.userId, Validators.required],
    brand_id_brand: new FormControl('', [Validators.required]),
    season_id_season: new FormControl('', [Validators.required]),
    type_id_type: new FormControl('', [Validators.required]),
    style: new FormControl('', [Validators.required]),
    colorPrim: new FormControl('', [Validators.required]),
    colorSecond: ['', []],
  });

  // matcher d'erreur input
  matcher = new MyErrorStateMatcher();

  // Etape de création d'un vêtement
  stepOne: boolean;

  // Saison
  season: SeasonInterface[] = this.stateService.season;
  type: TypeInterface[] = this.stateService.type;
  style: StyleInterface[] = this.stateService.style;
  brand: BrandInterface[] = this.stateService.brand;
  color: ColorInterface[] = this.stateService.color;


  ngOnInit() {
    this.stepOne = true;
  }

  uploadFile(event) {
    this.url = null;
    this.file = event[0];
    // Preview image
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = (evt: any) => {
      if (evt.target && evt.target.result) {
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
    if (this.formGarment.valid) {
      // send file
      console.log('file', this.file);
      const formData = new FormData();
      formData.append('file', this.file);
      const colors = [this.formGarment.value.colorPrim];
      if (this.formGarment.value.colorSecond) {
        colors.push(this.formGarment.value.colorSecond);
      }

      const body = {
        file: formData,
        user_id_user: this.formGarment.value.user_id_user,
        label_garment: this.formGarment.value.label_garment,
        brand_id_brand: this.formGarment.value.brand_id_brand,
        season_id_season: this.formGarment.value.season_id_season,
        type_id_type: this.formGarment.value.type_id_type,
        color: colors,
        style: this.formGarment.value.style,
      };

      this.bridgeService.addGarment(formData, body).subscribe(
        (res) => {
          console.log('*', res);
        }
      );

      console.log(body);

    } else {
      this.formGarment.markAllAsTouched();
    }
  }


}
