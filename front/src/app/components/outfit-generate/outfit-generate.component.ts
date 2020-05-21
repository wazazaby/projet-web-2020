import { Component, OnInit, ViewChild, Inject, AfterViewInit, Optional, ChangeDetectorRef } from '@angular/core';
import {
  GarmentColorStyleWrapperInterface, UserInterface, TypeInterface,
  ErrorInterface, OutfitGarmentWrapperInterface, SeasonInterface,
  ColorInterface, StyleInterface } from '@osmo6/models';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-outfit-generate',
  templateUrl: './outfit-generate.component.html',
  styleUrls: ['./outfit-generate.component.scss']
})

export class OutfitGenerateComponent implements OnInit, AfterViewInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService,
              private formBuild: FormBuilder,
              private cdRef: ChangeDetectorRef,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: {userId: number, outfit: OutfitGarmentWrapperInterface}
              ) {}

  /** Data user */
  user: UserInterface = this.stateService.userProfil;
  /** Liste des vêtements */
  garment: GarmentColorStyleWrapperInterface[] = this.stateService.garment;
  /** Récupére les vêtements classé par catégories */
  topGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentTop;
  midGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentMid;
  botGarment: GarmentColorStyleWrapperInterface[] = this.stateService.garmentBot;
  /** Liste des types */
  type: TypeInterface[] = this.stateService.type;
  /** Liste des saison */
  season: SeasonInterface[] = this.stateService.season;
  /** Liste des couleurs */
  color: ColorInterface[] = this.stateService.color;
  /** Liste des styles */
  style: StyleInterface[] = this.stateService.style;
  /** url de base pour fichier image */
  urlUpload = environment.apiUrlBase;
  /** Positionnement des vêtements dans le carousel */
  select = {
    garmentTop: null,
    garmentMid: null,
    garmentBot: null,
  };
  /** Form control pour la tenue */
  formOutfit: FormGroup = this.formBuild.group({
    label_outfit: new FormControl('', [Validators.required]),
    idGarmentTop: new FormControl('', [Validators.required]),
    idGarmentMid: new FormControl('', [Validators.required]),
    idGarmentBot: new FormControl('', [Validators.required])
  });
  /** L'utilisateur à t-il des vêtements dans chacune des catégories ? */
  userHasGarment = false;
  /** Init drag and drop du carousel */
  @ViewChild('top', {
    static: false,
    read: DragScrollComponent
  }) dsTop: DragScrollComponent;

  @ViewChild('mid', {
    static: false,
    read: DragScrollComponent
  }) dsMid: DragScrollComponent;

  @ViewChild('bot', {
    static: false,
    read: DragScrollComponent
  }) dsBot: DragScrollComponent;
  /** fin du drag and drop */
  // Mise à jour des index pour le carousel
  indexTop = 0;
  indexMid = 0;
  indexBot = 0;
  // Génération aléatoire des vêtement
  random = [
    {id: 1, label: 'le style :'},
    {id: 2, label: 'la couleur :'},
    {id: 3, label: 'la saison :'},
  ];
  // Enregistre liste style/couleur/saison
  randomId: number;
  // Enregistre le choix utilisateur
  randomChoose: number;


  /** Init la page */
  ngOnInit() {
    /** Vérif si l'utilisateur est connecter */
    if (this.user) {
      /** Si aucun vêtement */
      if (this.garment.length === 0) {
        /** On cache la page et on redirige vers la création de vêtements */
        this.userHasGarment = false;
        /** On tente de recharger les vêtement */
        this.bridgeService.getGarmentUser(this.user.id_user);
      }
    }

    /** Observable sur les vêtements */
    this.stateService.garmentAsObservable().subscribe(res => {
      /** Recharge les vêtement en cas de nouveauté */
      this.garment = res;
      if (this.garment.length !== 0) {
        /** Si un vé^tement minimum dans chaque catégories */
        if (this.topGarment.length !== 0 && this.midGarment.length !== 0 && this.botGarment.length !== 0) {
          this.userHasGarment = true;
        }
      }
    });
  }

  /** Aprés l'init de la page */
  ngAfterViewInit() {
    /** Si l'utilisateur modifie sa tenu */
    if (this.data && this.data.userId && this.data.outfit) {
      /** Attribut les valeurs de ses vêtements ou il faut */
      this.formOutfit.get('label_outfit').setValue(this.data.outfit.outfit.label_outfit);
      this.formOutfit.get('idGarmentTop').setValue(this.data.outfit.garments[0].garment.id_garment);
      this.formOutfit.get('idGarmentMid').setValue(this.data.outfit.garments[1].garment.id_garment);
      this.formOutfit.get('idGarmentBot').setValue(this.data.outfit.garments[2].garment.id_garment);

      /** Recherche l'index du vêtement */
      this.indexTop = this.topGarment.findIndex(c => c.garment.id_garment === this.data.outfit.garments[0].garment.id_garment);
      this.indexMid = this.midGarment.findIndex(c => c.garment.id_garment === this.data.outfit.garments[1].garment.id_garment);
      this.indexBot = this.botGarment.findIndex(c => c.garment.id_garment === this.data.outfit.garments[2].garment.id_garment);

      /** Déplace dans le carousel */
      this.selectItem(this.indexTop, this.data.outfit.garments[0], 'top');
      this.selectItem(this.indexMid, this.data.outfit.garments[1], 'mid');
      this.selectItem(this.indexBot, this.data.outfit.garments[2], 'bot');

      this.cdRef.detectChanges();

    } else {
      if (this.garment.length === 0 && this.user) {
        this.userHasGarment = false;
        this.bridgeService.getGarmentUser(this.user.id_user);
      } else {
        if (this.topGarment.length !== 0 && this.midGarment.length !== 0 && this.botGarment.length !== 0) {
          this.userHasGarment = true;
          this.moveTo(this.indexTop, 'top');
          this.moveTo(this.indexMid, 'mid');
          this.moveTo(this.indexBot, 'bot');
        }
      }

    }

  }

  /**
   * Permet de selectionne le vêtement
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

  /**
   * Permet de définir le carousel à la position initial
   */
  resetCarousel() {
    this.moveTo(0, 'top');
    this.formOutfit.get('idGarmentTop').setValue(null);
    this.select.garmentTop = null;
    this.moveTo(0, 'mid');
    this.formOutfit.get('idGarmentMid').setValue(null);
    this.select.garmentMid = null;
    this.moveTo(0, 'bot');
    this.formOutfit.get('idGarmentBot').setValue(null);
    this.select.garmentBot = null;
  }


  /**
   * Enregistre les vêtement dans une tenue
   */
  sendOutfit() {
    /** Si c'est un ajout */
    if (!this.data) {
      if (this.formOutfit.valid) {
        const body = {
          user_id_user: this.user.id_user,
          label_outfit: this.formOutfit.value.label_outfit,
          id_garments: [
            this.formOutfit.value.idGarmentTop,
            this.formOutfit.value.idGarmentMid,
            this.formOutfit.value.idGarmentBot
          ]
        };

        this.bridgeService.addOutfit(body).subscribe(res => {
          if (this.stateService.checkStatus(res.status)) {
            this.moveTo(0, 'top');
            this.moveTo(0, 'mid');
            this.moveTo(0, 'bot');
            this.select.garmentTop = null;
            this.select.garmentMid = null;
            this.select.garmentBot = null;
            this.bridgeService.getAllOutfit(this.user.id_user);
            this.formOutfit.reset();
            this.stateService.openSnackBar(res.message, null);
          } else {
            const err: ErrorInterface = {
              code: res.status,
              message: res.message,
              route: environment.apiUrlService + this.bridgeService.userGarmentAdd
            };
            this.stateService.openSnackBar(err.message, null, 'err');
            this.stateService.errors = err;
          }
        });

      } else {
        this.formOutfit.markAllAsTouched();
      }
    } else {
      /** Modification d'une tenue */
      if (this.formOutfit.valid) {
        const resUpdate = {
          user_id_user: this.user.id_user,
          label_outfit: this.formOutfit.value.label_outfit,
          id_garments: [
            this.formOutfit.value.idGarmentTop,
            this.formOutfit.value.idGarmentMid,
            this.formOutfit.value.idGarmentBot
          ],
          id_outfit: this.data.outfit.outfit.id_outfit
        };
        this.bridgeService.updateOutfit(resUpdate).subscribe(res => {
          this.stateService.closeDialogOutfit = true;
          this.bridgeService.getAllOutfit(resUpdate.user_id_user);
        });
      } else {
        /** Génére les erreurs du form control */
        this.formOutfit.markAllAsTouched();
      }
    }
  }

  /**
   * Génére une tenue aléatoire en fonction des données choisi
   */
  sendRandom() {
    this.resetCarousel();
    if (this.randomChoose && this.randomId) {

      this.bridgeService.generaterandOutfit(this.user.id_user, this.randomId, this.randomChoose).subscribe(response => {
        if (this.stateService.checkStatus(response.status)) {
          let top: GarmentColorStyleWrapperInterface;
          let mid: GarmentColorStyleWrapperInterface;
          let bot: GarmentColorStyleWrapperInterface;

          if (response.data[0] !== 0) {
            top = this.topGarment.find(c => c.garment.id_garment === response.data[0]);
            this.indexTop = this.topGarment.findIndex(c => c.garment.id_garment === response.data[0]);
            this.selectItem(this.indexTop, top, 'top');
          }

          if (response.data[1] !== 0) {
            mid = this.midGarment.find(c => c.garment.id_garment === response.data[1]);
            this.indexMid = this.midGarment.findIndex(c => c.garment.id_garment === response.data[1]);
            this.selectItem(this.indexMid, mid, 'mid');
          }

          if (response.data[2] !== 0) {
            bot = this.botGarment.find(c => c.garment.id_garment === response.data[2]);
            this.indexBot = this.botGarment.findIndex(c => c.garment.id_garment === response.data[2]);
            this.selectItem(this.indexBot, bot, 'bot');
          }

          this.cdRef.detectChanges();

          this.stateService.openSnackBar(response.message, null);
        } else {
          const err: ErrorInterface = {
              code: response.status,
              message: response.message,
              route: environment.apiUrlService + 'outfit/generate'
          };

          this.stateService.openSnackBar(err.message, null, 'err');
          this.stateService.errors = err;
        }
      });
    }
  }
}
