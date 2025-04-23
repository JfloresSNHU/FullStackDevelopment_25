import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { RegisterUser, LoginUser } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../trip-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public saveUser(user: any): void {
    this.storage.setItem('travlr-user', JSON.stringify(user));
  }
  

  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.storage.removeItem('travlr-user');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
      } catch {
        return false;
      }
    }
    return false;
  }

  public getCurrentUser(): RegisterUser | undefined {
    if (this.isLoggedIn()) {
      const user = this.storage.getItem('travlr-user');
      return user ? JSON.parse(user) : undefined;
    }
    return undefined;
  }

  public login(user: LoginUser): Promise<void> {
    return this.tripDataService.login(user).then((authResp: AuthResponse) => {
      this.saveToken(authResp.token);
  
      // ✅ Extract user data from token
      const decoded = JSON.parse(atob(authResp.token.split('.')[1]));
      const userInfo = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };
  
      this.saveUser(userInfo);
    });
  }

  public register(user: RegisterUser): Promise<void> {
    return this.tripDataService.register(user).then((authResp: AuthResponse) => {
      this.saveToken(authResp.token);
  
      // ✅ Extract user data from token
      const decoded = JSON.parse(atob(authResp.token.split('.')[1]));
      const userInfo = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };
  
      this.saveUser(userInfo);
    });
  }

  // ✅ Signup used in signup.component.ts
  public signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    });
  }
}
