import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT } from '@boilerplate/app-config';
import { LoginRequest as GeneratedLoginRequest, LoginResponse as GeneratedLoginResponse } from '@boilerplate/api-client-generated';
import { LoginRequestDto, LoginResponseDto } from '@boilerplate/contracts';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiAdapter {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENVIRONMENT);

  login(payload: LoginRequestDto): Observable<LoginResponseDto> {
    const request: GeneratedLoginRequest = {
      email: payload.email,
      password: payload.password,
    };

    if (this.env.enableMockAuth) {
      return this.mockLogin(request).pipe(delay(450));
    }

    return this.http.post<LoginResponseDto>(`${this.env.apiBaseUrl}/auth/login`, request);
  }

  private mockLogin(request: GeneratedLoginRequest): Observable<LoginResponseDto> {
    const response: GeneratedLoginResponse = {
      user: {
        id: 'u-1001',
        displayName: request.email.split('@')[0] ?? 'architect',
        email: request.email,
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      },
    };

    return of({
      user: response.user,
      tokens: response.tokens,
    });
  }
}
