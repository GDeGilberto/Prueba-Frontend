import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isLoggedIn();
    console.log('🛡️ NoAuthGuard: Verificando acceso a:', state.url, { isAuthenticated });
    
    if (!isAuthenticated) {
      console.log('✅ NoAuthGuard: Usuario no autenticado, permitiendo acceso');
      return true; // No está autenticado, puede acceder al login
    }

    // Ya está autenticado, redirigir al dashboard
    console.log('🚫 NoAuthGuard: Usuario ya autenticado, redirigiendo a dashboard');
    this.router.navigate(['/dashboard']);
    return false;
  }
}
