import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionFacade } from './auth-session.facade';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.includes('/auth/login')) {
    return next(request);
  }

  const token = inject(AuthSessionFacade).accessToken();
  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
