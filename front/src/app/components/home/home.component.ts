import { Component, OnInit, ViewChild } from '@angular/core';
import { GarmentColorStyleWrapperInterface, UserInterface, TypeInterface } from '@osmo6/models';

import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService) {}

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

  @ViewChild('nav', {
    static: true,
    read: DragScrollComponent
  }) ds: DragScrollComponent;


  ngOnInit() {
    /** Si aucun vêtement */
    if (this.garment.length === 0) {
      this.bridgeService.getGarmentUser(this.user.id_user);
    }

    /** Observable sur les vêtements */
    this.stateService.garmentAsObservable().subscribe(res => {
      this.garment = res;
      console.log(this.topGarment);
    });
    this.moveTo(0);
  }

  moveItem(i: number, garment: GarmentColorStyleWrapperInterface) {
    console.log(i, garment);
    this.moveTo(i);
  }

  /**
   * Permet de définir le numero de l'index
   * @param {number}
   */
  index(e) {
    console.log(e);
    console.log(this.garment[e].garment);
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }
}
