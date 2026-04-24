import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface AppEnvironment {
  production: boolean;
  apiBaseUrl: string;
  defaultLocale: 'en-US' | 'fr';
  authStorageKey: string;
  enableMockAuth: boolean;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');

export function provideAppEnvironment(env: AppEnvironment): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: APP_ENVIRONMENT, useValue: env }]);
}
