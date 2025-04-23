import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    const isAdmin = user && user.email && user.email.includes('admin'); // or use a proper role if available
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
