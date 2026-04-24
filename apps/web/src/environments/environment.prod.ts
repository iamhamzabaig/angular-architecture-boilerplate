import { AppEnvironment } from '@boilerplate/app-config';

export const environment: AppEnvironment = {
  production: true,
  apiBaseUrl: 'https://api.example.com',
  defaultLocale: 'en-US',
  authStorageKey: 'boilerplate.auth',
  enableMockAuth: false,
};
