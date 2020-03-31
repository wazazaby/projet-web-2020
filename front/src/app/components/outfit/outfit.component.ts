import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { UserModel } from '@osmo6/models';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit {

  constructor(private stateService: StatesService) { }

  user: UserModel = this.stateService.userProfil;

  async ngOnInit() {
    console.log('outfit page');
    console.log(this.user);
  }

}
