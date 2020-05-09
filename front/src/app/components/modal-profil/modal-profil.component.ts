import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-profil',
  templateUrl: './modal-profil.component.html',
  styleUrls: ['./modal-profil.component.scss']
})
export class ModalProfilComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
