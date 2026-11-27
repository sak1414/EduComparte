import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos los servicios necesarios
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado (tiene token)
  if (authService.estaAutenticado()) {
    return true; // Si tiene token, lo dejamos pasar
  } else {
    // Si no tiene token, lo mandamos al login
    router.navigate(['/login']);
    return false;
  }
};