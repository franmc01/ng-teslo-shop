import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, map, catchError, Observable } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';
const BASE_URL = environment.baseURL;
const TOKEN_KEY = 'token';

interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private readonly http = inject(HttpClient);

  // Computed signals
  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._authStatus() === 'authenticated' && this._user()
      ? 'authenticated'
      : 'unauthenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  constructor() {
    const storedToken = this.getStoredToken();
    if (storedToken) {
      this._token.set(storedToken);
    }
  }

  authResource = rxResource({
    stream: () => this.checkAuthStatus(),
  });

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/login`, { email, password }).pipe(
      map((response) => this.handleAuthSuccess(response)),
      catchError(() => this.handleAuthError())
    );
  }

  logout(): void {
    this.clearAuthData();
    this._authStatus.set('unauthenticated');
  }

  checkAuthStatus(): Observable<boolean> {
    const token = this.getStoredToken();

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${BASE_URL}/auth/check-status`).pipe(
      map((response) => this.handleAuthSuccess(response)),
      catchError(() => this.handleAuthError())
    );
  }

  // Private methods (DRY principle)
  private handleAuthSuccess(response: AuthResponse): boolean {
    const { user, token } = response;

    this.setAuthData(user, token);
    this._authStatus.set('authenticated');

    return true;
  }

  private handleAuthError(): Observable<boolean> {
    this.logout();
    return of(false);
  }

  private setAuthData(user: User, token: string): void {
    this._user.set(user);
    this._token.set(token);
    this.setStoredToken(token);
  }

  private clearAuthData(): void {
    this._user.set(null);
    this._token.set(null);
    this.removeStoredToken();
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private setStoredToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private removeStoredToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
