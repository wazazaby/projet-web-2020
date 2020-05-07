import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitComponent } from './outfit.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OutfitComponent', () => {
  let component: OutfitComponent;
  let fixture: ComponentFixture<OutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
