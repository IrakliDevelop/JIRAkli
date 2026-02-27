import { Injectable, signal, computed } from '@angular/core';

interface User {
  id: string;
  email: string;
  displayName: string;
}

const STORAGE_KEY_TOKEN = 'auth_token';
const STORAGE_KEY_USER = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _user = signal<User | null>(this.loadUser());
  private readonly _token = signal<string | null>(this.loadToken());

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly userDisplayName = computed(() => this._user()?.displayName ?? 'Guest');

  setAuth(user: User, token: string): void {
    this._user.set(user);
    this._token.set(token);
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }

  clearAuth(): void {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  }

  private loadToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_TOKEN);
  }

  private loadUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }
}
