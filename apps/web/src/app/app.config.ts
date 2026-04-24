import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAppEnvironment } from '@boilerplate/app-config';
import { authTokenInterceptor } from '@boilerplate/data-access-auth';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAppEnvironment(environment),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
