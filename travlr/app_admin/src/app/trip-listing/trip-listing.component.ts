import { Component, OnInit } from '@angular/core';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripDataService, private router: Router, public authService: AuthenticationService) {}

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

addTrip(): void {
  this.router.navigate(['/add-trip']);
}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Failed to load trips', err)
    });
  }
}
