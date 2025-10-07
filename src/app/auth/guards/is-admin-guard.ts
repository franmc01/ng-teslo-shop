import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  await lastValueFrom(authService.checkAuthStatus());
  
  return authService.isAdmin();
};
