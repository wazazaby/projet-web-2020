import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { UserInterface, OutfitGarmentWrapperInterface } from '@osmo6/models';
import { BridgeService } from 'src/app/services/bridge.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit {

  constructor(private stateService: StatesService,
              private bridgeService: BridgeService) { }

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

  action() {
    console.log('action');
  }

}
