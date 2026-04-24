import { Route } from '@angular/router';
import { FeatureAuthComponent } from './feature-auth/feature-auth';

export const featureAuthRoutes: Route[] = [
  {
    path: '',
    component: FeatureAuthComponent,
    title: 'Login',
  },
];
