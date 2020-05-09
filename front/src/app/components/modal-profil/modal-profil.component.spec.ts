import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfilComponent } from './modal-profil.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatesService } from 'src/app/services/states.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ModalProfilComponent', () => {
  let component: ModalProfilComponent;
  let fixture: ComponentFixture<ModalProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [ ModalProfilComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {}, },
        StatesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
