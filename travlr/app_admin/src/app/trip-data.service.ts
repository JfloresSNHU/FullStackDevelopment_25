import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Trip } from './models/trip';
import { User } from './models/user';
import { AuthResponse } from './models/authresponse';

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

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBase}/trips/${trip.code}`, trip);
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/trips/${code}`);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url = `${this.apiBase}/${urlPath}`;
    return firstValueFrom(this.http.post<AuthResponse>(url, user));
  }
}

