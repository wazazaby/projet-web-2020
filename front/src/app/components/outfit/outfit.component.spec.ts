import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitComponent } from './outfit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BridgeService } from 'src/app/services/bridge.service';
import { StatesService } from 'src/app/services/states.service';
import { HttpClientModule } from '@angular/common/http';

describe('OutfitComponent', () => {
  let component: OutfitComponent;
  let fixture: ComponentFixture<OutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitComponent ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule
      ],
      providers: [
        BridgeService,
        StatesService
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
