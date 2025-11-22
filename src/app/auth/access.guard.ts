import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActiveGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const isLoggedIn = this.authService.isAuth;

    if (isLoggedIn) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
