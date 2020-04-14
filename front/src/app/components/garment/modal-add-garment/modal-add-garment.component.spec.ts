import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddGarmentComponent } from './modal-add-garment.component';

describe('ModalAddGarmentComponent', () => {
  let component: ModalAddGarmentComponent;
  let fixture: ComponentFixture<ModalAddGarmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddGarmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddGarmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
