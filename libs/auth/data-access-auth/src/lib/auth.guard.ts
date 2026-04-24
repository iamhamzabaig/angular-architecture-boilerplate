import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthSessionFacade } from './auth-session.facade';

export const authCanMatchGuard: CanMatchFn = (): boolean | UrlTree => {
  const authSession = inject(AuthSessionFacade);
  if (authSession.isAuthenticated()) {
    return true;
  }

  return inject(Router).parseUrl('/login');
};
