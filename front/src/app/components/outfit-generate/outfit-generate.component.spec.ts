import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitGenerateComponent } from './outfit-generate.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BridgeService } from 'src/app/services/bridge.service';
import { StatesService } from 'src/app/services/states.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OutfitGenerateComponent', () => {
  let component: OutfitGenerateComponent;
  let fixture: ComponentFixture<OutfitGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        DragScrollModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ OutfitGenerateComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        BridgeService,
        StatesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
