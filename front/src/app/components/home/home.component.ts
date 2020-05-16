import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { GarmentColorStyleWrapperInterface, UserInterface, TypeInterface } from '@osmo6/models';

import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService,
              private formBuild: FormBuilder) {}

  /** User */
  user: UserInterface = this.stateService.userProfil;
  /** Liste des vêtements */
  garment: GarmentColorStyleWrapperInterface[] = this.stateService.garment;

  /** Définit dans quel catégories classé les vêtements */
  topGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentTop;
  midGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentMid;
  botGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentBot;

  /** Liste des types de vêtement */
  type: TypeInterface[] = this.stateService.type;

  /** base url upload image */
  urlUpload = environment.apiUpload;

  select = {
    garmentTop: null,
    garmentMid: null,
    garmentBot: null,
  };

  formOutfit: FormGroup = this.formBuild.group({
    label_garment: new FormControl('', [Validators.required]),
    user_id_user: [this.user.id_user, Validators.required],
    idGarmentTop: new FormControl('', [Validators.required]),
    idGarmentMid: new FormControl('', [Validators.required]),
    idGarmentBot: new FormControl('', [Validators.required])
  });

  @ViewChild('top', {
    static: true,
    read: DragScrollComponent
  }) dsTop: DragScrollComponent;

  @ViewChild('mid', {
    static: true,
    read: DragScrollComponent
  }) dsMid: DragScrollComponent;


  @ViewChild('bot', {
    static: true,
    read: DragScrollComponent
  }) dsBot: DragScrollComponent;


  ngOnInit() {
    /** Si aucun vêtement */
    if (this.garment.length === 0) {
      this.bridgeService.getGarmentUser(this.user.id_user);
    }

    /** Observable sur les vêtements */
    this.stateService.garmentAsObservable().subscribe(res => {
      this.garment = res;
    });

    this.moveTo(0, 'top');
    this.moveTo(0, 'mid');
    this.moveTo(0, 'bot');

  }

  /**
   * Permet d'enregistrer le vêtement
   * @param i index
   * @param garment vêtement
   * @param pos position du vêtement
   */
  selectItem(i: number, garment: GarmentColorStyleWrapperInterface, pos: string) {
    if (pos === 'top') {
      this.moveTo(i, pos);
      this.formOutfit.get('idGarmentTop').setValue(garment.garment.id_garment);
      this.select.garmentTop = garment;

    } else if (pos === 'mid') {
      this.moveTo(i, pos);
      this.formOutfit.get('idGarmentMid').setValue(garment.garment.id_garment);
      this.select.garmentMid = garment;
    } else {
      this.moveTo(i, pos);
      this.formOutfit.get('idGarmentBot').setValue(garment.garment.id_garment);
      this.select.garmentBot = garment;
    }
  }

  /**
   * Permet de définir le vêtement selectionner au drag and drop
   * @param {number}
   */
  index(e: number, pos: string) {
    if (pos === 'top') {
      this.selectItem(e, this.topGarment[e], pos);
    } else if (pos === 'mid') {
      this.selectItem(e, this.midGarment[e], pos);
    } else {
      this.selectItem(e, this.botGarment[e], pos);
    }
  }

  /**
   * Permet de déplacer le drag and drop sur le tableau correspondant
   * @param e index
   * @param pos position du vêtement
   */
  moveTo(e: number, pos: string) {
    if (pos === 'top') {
      this.dsTop.moveTo(e);
    } else if (pos === 'mid') {
      this.dsMid.moveTo(e);
    } else {
      this.dsBot.moveTo(e);
    }
  }


  sendOutfit() {
    if (this.formOutfit.valid) {
      console.log(this.select);

    } else {
      this.formOutfit.markAllAsTouched();
    }
  }
}
