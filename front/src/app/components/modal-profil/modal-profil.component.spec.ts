import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfilComponent } from './modal-profil.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StatesService } from 'src/app/services/states.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ModalProfilComponent', () => {
  let component: ModalProfilComponent;
  let fixture: ComponentFixture<ModalProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
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
