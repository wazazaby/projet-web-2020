import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { UserInterface, OutfitGarmentWrapperInterface, ErrorInterface } from '@osmo6/models';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { OutfitGenerateComponent } from '../outfit-generate/outfit-generate.component';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService,
              public dialog: MatDialog) { }

  apiUrlBase = environment.apiUrlBase;

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
      });
    }

  }

  date(d: number) {
    const date = new Date(d * 1000);
    return date;
  }

  action(num: number, outfit: OutfitGarmentWrapperInterface): void {
    if (num === 0) {
      // supprimer
      this.removeOutfit(outfit);
    } else {
      // modifier
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
        this.bridgeService.deleteOutfit(outfit).subscribe(resOutfit => {
          if (this.stateService.checkStatus(resOutfit.status)) {
            this.stateService.openSnackBar(resOutfit.message, null);
            this.bridgeService.getAllOutfit(outfit.outfit.user_id_user);
          } else {
              const err: ErrorInterface = {
                  code: resOutfit.status,
                  message: resOutfit.message,
                  route: environment.apiUrlService + '/api/user/' +
                      outfit.outfit.user_id_user + '/outfit/delete/' + outfit.outfit.id_outfit
              };
              this.stateService.openSnackBar(err.message, null, 'err');
              this.stateService.errors = err;
              this.stateService.openSnackBar(resOutfit.message, null);
          }
        });
      }
    });
  }

    /**
     * Permet de modifier la tenue
     * @param {outfit} outfit
     */
    updateOutfit(outfit: OutfitGarmentWrapperInterface) {
      if (outfit && this.user) {
          const dialogRef = this.dialog.open(OutfitGenerateComponent, {
              width: '60%',
              data: { outfit, userId: this.user.id_user }
          });

          this.stateService.closeDialogOutfitAsObservable().subscribe(close => {
            if (close) {
              this.stateService.closeDialogOutfit = false;
              dialogRef.close();
            }
          });
      }
  }

}
