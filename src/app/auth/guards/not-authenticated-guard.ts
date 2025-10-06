import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await lastValueFrom(authService.checkAuthStatus());

  if (isAuthenticated) {
    router.navigateByUrl('/', {
      replaceUrl: true,
    });
    return false;
  }

  return true;
};
