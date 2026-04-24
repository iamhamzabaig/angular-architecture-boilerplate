import { AppEnvironment } from '@boilerplate/app-config';

export const environment: AppEnvironment = {
  production: false,
  apiBaseUrl: '/api',
  defaultLocale: 'en-US',
  authStorageKey: 'boilerplate.auth',
  enableMockAuth: true,
};
