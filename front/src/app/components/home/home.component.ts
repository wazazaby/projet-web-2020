import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private statesService: StatesService) { }

  public test;

  ngOnInit() {
    this.statesService.initApi().subscribe((res) => {
      this.test = res;
      console.log(res);
    });
  }

}
