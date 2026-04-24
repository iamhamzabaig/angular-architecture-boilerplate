import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequestDto, UserSessionViewModel } from '@boilerplate/contracts';
import { AuthApiAdapter } from '@boilerplate/api-client';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthTokenStorageService } from './auth-token-storage.service';

export type AuthRequestStatus = 'idle' | 'loading' | 'error';

@Injectable({ providedIn: 'root' })
export class AuthSessionFacade {
  private readonly storage = inject(AuthTokenStorageService);
  private readonly api = inject(AuthApiAdapter);

  private readonly sessionState = signal<UserSessionViewModel | null>(this.storage.readSession());
  readonly session = computed(() => this.sessionState());
  readonly accessToken = computed(() => this.sessionState()?.tokens.accessToken ?? null);
  readonly isAuthenticated = computed(() => this.sessionState() !== null);

  readonly requestStatus = signal<AuthRequestStatus>('idle');
  readonly requestError = signal<string | null>(null);

  login(credentials: LoginRequestDto): Observable<UserSessionViewModel> {
    this.requestStatus.set('loading');
    this.requestError.set(null);

    return this.api.login(credentials).pipe(
      tap((session) => {
        this.storage.writeSession(session);
        this.sessionState.set(session);
        this.requestStatus.set('idle');
      }),
      catchError((error) => {
        this.requestStatus.set('error');
        this.requestError.set('Unable to authenticate with provided credentials.');
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    this.storage.clear();
    this.sessionState.set(null);
    this.requestStatus.set('idle');
    this.requestError.set(null);
  }
}
