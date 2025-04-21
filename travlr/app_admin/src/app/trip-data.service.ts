import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './models/trip'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBase = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBase}/trips`);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/trips/${code}`);
  }
  
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBase}/trips`, trip);
  }

  updateTrip(trip: Trip): Observable<any> {
    return this.http.put(`${this.apiBase}/trips/${trip.code}`, trip);
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/trips/${code}`);
  }
  
}
