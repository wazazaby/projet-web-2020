import { TestBed } from '@angular/core/testing';

import { StatesService } from './states.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('StatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule,
      MatSnackBarModule
    ]
  }));

  it('should be created', () => {
    const service: StatesService = TestBed.get(StatesService);
    expect(service).toBeTruthy();
  });
});
