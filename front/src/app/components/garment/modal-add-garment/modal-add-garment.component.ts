import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-garment',
  templateUrl: './modal-add-garment.component.html',
  styleUrls: ['./modal-add-garment.component.scss']
})
export class ModalAddGarmentComponent {

  constructor() { }

  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

}
