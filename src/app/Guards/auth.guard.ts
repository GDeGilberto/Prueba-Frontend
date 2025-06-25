import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../Services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: Auth
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Redireccionar al login si no está autenticado
    this.router.navigate(['/login']);
    return false;
  }
}
