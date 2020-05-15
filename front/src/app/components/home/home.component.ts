import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(stateService: StatesService,
              bridgeService: BridgeService) {}

  ngOnInit() {
  }
}
