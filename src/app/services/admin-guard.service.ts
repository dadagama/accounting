import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService  implements CanActivate {
  isAdmin = false;

  evaluateAdminGuard(pass) {
    this.isAdmin = pass === ('p3hm4' + new Date().getDate());
    if (!this.isAdmin) {
      this.router.navigate(['']);
    }
    return this.isAdmin;
  }

  constructor(public router: Router) {}

  canActivate(): boolean {
    console.log('[service] - AdminGuardService - canActivate');

    if (!this.isAdmin) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  isAdminMode() {
    return this.isAdmin;
  }

}
