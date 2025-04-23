import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✅ Import RouterModule
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // ✅ Needed for routerLink to work
  ]
})
export class NavbarComponent {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ Redirect after logout
  }
}
