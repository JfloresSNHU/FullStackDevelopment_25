import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Trip } from './models/trip';
import { RegisterUser, LoginUser } from './models/user';
import { AuthResponse } from './models/authresponse';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBase = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('travlr-token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBase}/trips`);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/trips/${code}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBase}/trips`, trip, this.getAuthHeaders());
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBase}/trips/${trip.code}`, trip, this.getAuthHeaders());
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/trips/${code}`, this.getAuthHeaders());
  }

  public async login(user: LoginUser): Promise<AuthResponse> {
    const response = await this.makeAuthApiCall('login', user);
    if (response.token) {
      localStorage.setItem('travlr-token', response.token);
    }
    return response;
  }

  public async register(user: RegisterUser): Promise<AuthResponse> {
    const response = await this.makeAuthApiCall('register', user);
    if (response.token) {
      localStorage.setItem('travlr-token', response.token);
    }
    return response;
  }

  private async makeAuthApiCall(urlPath: string, user: LoginUser | RegisterUser): Promise<AuthResponse> {
    const url = `${this.apiBase}/${urlPath}`;
    return await firstValueFrom(this.http.post<AuthResponse>(url, user));
  }
}
