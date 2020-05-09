import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfilComponent } from './modal-profil.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalProfilComponent', () => {
  let component: ModalProfilComponent;
  let fixture: ComponentFixture<ModalProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProfilComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
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
