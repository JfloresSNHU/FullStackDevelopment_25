import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../models/trip';

@Component({
  standalone: true, // ✅ Enables standalone module
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  imports: [CommonModule] // ✅ Brings in ngFor, pipes like number, etc.
})
export class TravelComponent implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  selectedFilter: 'low' | 'mid' | 'high' = 'low';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe((data: Trip[]) => {
      this.trips = data;
      this.applyFilter();
    });
  }

  selectFilter(filter: 'low' | 'mid' | 'high'): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.selectedFilter) {
      case 'low':
        this.filteredTrips = this.trips.filter(t => t.perPerson >= 500 && t.perPerson <= 1000);
        break;
      case 'mid':
        this.filteredTrips = this.trips.filter(t => t.perPerson > 1000 && t.perPerson <= 2000);
        break;
      case 'high':
        this.filteredTrips = this.trips.filter(t => t.perPerson > 2000);
        break;
    }
  }
}
