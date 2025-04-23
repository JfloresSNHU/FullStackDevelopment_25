import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreed = false;
  errorMessage = '';
  formError: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  onSubmit(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.agreed) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    })
    .then(() => this.router.navigate(['/']))
    .catch(err => this.formError = 'Registration failed');
    ;
  }
}
