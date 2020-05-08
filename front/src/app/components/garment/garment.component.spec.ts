import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentComponent } from './garment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

describe('GarmentComponent', () => {
  let component: GarmentComponent;
  let fixture: ComponentFixture<GarmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        MatBadgeModule
      ],
      declarations: [ GarmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
