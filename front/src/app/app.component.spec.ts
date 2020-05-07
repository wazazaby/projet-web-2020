import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule,  MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // exemple de test unitaire
  it('should test function test()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.test).toBeDefined('test');
  });

});
