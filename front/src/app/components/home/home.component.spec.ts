import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BridgeService } from 'src/app/services/bridge.service';
import { StatesService } from 'src/app/services/states.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        BridgeService,
        StatesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
