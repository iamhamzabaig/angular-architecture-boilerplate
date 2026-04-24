import { Route } from '@angular/router';
import { authCanMatchGuard } from '@boilerplate/data-access-auth';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@boilerplate/feature-auth').then((m) => m.featureAuthRoutes),
  },
  {
    path: 'dashboard',
    canMatch: [authCanMatchGuard],
    loadChildren: () =>
      import('@boilerplate/feature-dashboard').then(
        (m) => m.featureDashboardRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
