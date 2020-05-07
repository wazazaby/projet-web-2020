import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StatesService } from './states.service';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private stateService: StatesService,
              private router: Router) { }

  canActivate() {
    return this.stateService.isLoggedIn().pipe(
      tap(authenticated => {
        // console.log('auth', authenticated);
        if (!authenticated) {
          this.router.navigate(['/auth']);
        } else {
          // console.log('auth OK');
        }
      })
    );
  }
}

