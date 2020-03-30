import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('garment page');
  }

}
