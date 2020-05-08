import { TestBed, fakeAsync } from '@angular/core/testing';

import { BridgeService } from './bridge.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule,
      MatSnackBarModule
    ]
  }));

  it('Get all brand should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getBrandReq().subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Get all season should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getSeasonReq().subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Get all type should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getTypeReq().subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Get all color should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getColorReq().subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Get all style should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getStyleReq().subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Get all garment for one user should be loaded', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.getGarmentUserReq(2).subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

  it('Init all loaded', () => {
    const service: BridgeService = TestBed.get(BridgeService);
    expect(service.initData(true)).toBeDefined(Boolean);
  });

  it('Should login OK', (done) => {
    const service: BridgeService = TestBed.get(BridgeService);
    service.login('mail@mail.com', 'motdepasse').subscribe(res => {
      expect(res.status).toEqual(200 || 403 || 404);
      done();
    });
  });

});
