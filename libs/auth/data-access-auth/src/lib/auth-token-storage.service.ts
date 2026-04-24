import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APP_ENVIRONMENT } from '@boilerplate/app-config';
import { UserSessionViewModel } from '@boilerplate/contracts';

@Injectable({ providedIn: 'root' })
export class AuthTokenStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly env = inject(APP_ENVIRONMENT);
  private readonly sessionKey = `${this.env.authStorageKey}.session`;

  readSession(): UserSessionViewModel | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const raw = localStorage.getItem(this.sessionKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserSessionViewModel;
    } catch {
      return null;
    }
  }

  writeSession(session: UserSessionViewModel): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(this.sessionKey);
  }
}
