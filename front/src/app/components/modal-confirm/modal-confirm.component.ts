import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GarmentColorStyleWrapperInterface } from '@osmo6/models';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    route: string = this.data.route;
    garment: GarmentColorStyleWrapperInterface = this.data.garment ? this.data.garment : null;

    ngOnInit() {
    }

    convertDate(d: number) {
        return new Date(d * 1000);
    }
}
