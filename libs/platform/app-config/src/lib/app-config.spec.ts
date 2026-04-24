import { AppEnvironment } from './app-config';

describe('app-config', () => {
  it('should enforce environment typing', () => {
    const env: AppEnvironment = {
      production: false,
      apiBaseUrl: '/api',
      defaultLocale: 'en-US',
      authStorageKey: 'app.auth',
      enableMockAuth: true,
    };

    expect(env.apiBaseUrl).toBe('/api');
  });
});
