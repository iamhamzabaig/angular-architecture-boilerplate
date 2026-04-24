import { Route } from '@angular/router';
import { FeatureDashboardComponent } from './feature-dashboard/feature-dashboard';

export const featureDashboardRoutes: Route[] = [
  {
    path: '',
    component: FeatureDashboardComponent,
    title: 'Dashboard',
  },
];
