import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { UserInterface, OutfitGarmentWrapperInterface } from '@osmo6/models';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService,
              public dialog: MatDialog) { }

  urlApiUpload = environment.apiUpload;

  /** Info utilisateur */
  user: UserInterface = this.stateService.userProfil;

  /** Tenue utilisateur */
  outfit: OutfitGarmentWrapperInterface[] = this.stateService.outfit;

  ngOnInit() {

    /** Si aucun outifit */
    if (this.user) {
      if (this.outfit.length === 0) {
        this.bridgeService.getAllOutfit(this.user.id_user);
      }

      this.stateService.outfitAsObservable().subscribe(res => {
        this.outfit = res;
        console.log(this.outfit);
      });
    }

  }

  date(d: number) {
    const date = new Date(d * 1000);
    return date;
  }

  action(num: number, outfit: OutfitGarmentWrapperInterface): void {
    console.log('action');
    if (num === 0) {
      // supprimer
      console.log('del', outfit);
      this.removeOutfit(outfit);
    } else {
      // modifier
      console.log('up', outfit);
      this.updateOutfit(outfit);
    }
  }

  /**
   * Permet de supprimer une tenu de la liste
   * @param {outfit} outfit
   */
  removeOutfit(outfit: OutfitGarmentWrapperInterface) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
        width: '60%',
        data: { outfit, route: 'outfit' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // service remove outfit
      }
    });
  }

    /**
     * Permet de modifier la tenue
     * @param {outfit} outfit
     */
    updateOutfit(outfit: OutfitGarmentWrapperInterface) {
      if (outfit && this.user) {
          const dialogRef = this.dialog.open(HomeComponent, {
              width: '60%',
              data: { outfit, userId: this.user.id_user }
          });

          dialogRef.afterClosed().subscribe(result => {
              console.log('t', result);
              if (result === true) {
                  // dialogRef.close();
              }
          });
      }
  }

}
