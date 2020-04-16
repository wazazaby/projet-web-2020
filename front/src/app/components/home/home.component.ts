import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private stateService: StatesService) { }

  ngOnInit() {
    console.log('home page');
    console.log(this.stateService.reloadApp);
    console.log(this.stateService.brand);
  }
}
