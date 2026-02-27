import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStateService } from '../core';
import { environment } from '../../environments/environment';

interface AuthResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      displayName: string;
    };
  };
}

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthStateService);
  private readonly apiUrl = environment.apiUrl;

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, dto).pipe(
      tap((response) => {
        this.authState.setAuth(response.data.user, response.data.accessToken);
      }),
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, dto).pipe(
      tap((response) => {
        this.authState.setAuth(response.data.user, response.data.accessToken);
      }),
    );
  }

  logout(): void {
    this.authState.clearAuth();
  }
}
