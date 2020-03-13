import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { UserModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public arrTest: UserModel;

  constructor (private statesService: StatesService, private bridgeState: BridgeService) { }

  ngOnInit () {
    this.statesService.initApi().subscribe(res => {
      console.log(res);
    });

    this.bridgeState.getUser().subscribe((res) => {
      this.arrTest = res;
    });
  }
}
