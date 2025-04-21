import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../trip-data.service';



@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})



export class TripCardComponent {
  @Input() trip!: Trip;
  constructor(private router: Router, public authService: AuthenticationService, private tripService: TripDataService) {}

  editTrip(): void {
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigate(['/edit-trip']);
  }

  onDeleteTrip(): void {
    if (confirm(`Are you sure you want to delete "${this.trip.name}"?`)) {
      this.tripService.deleteTrip(this.trip.code).subscribe({
        next: () => window.location.reload(), // ✅ Reload or use Output() for better state mgmt
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

}


