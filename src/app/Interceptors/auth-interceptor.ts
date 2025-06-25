import { inject } from '@angular/core';
import { 
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth';
import { Router } from '@angular/router';

export const authInterceptorFn: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const token = authService.getToken();
  console.log('🔐 AuthInterceptor: Interceptando request a:', request.url);
  console.log('🔑 AuthInterceptor: Token disponible:', !!token);
  
  if (token) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ AuthInterceptor: Header Authorization agregado');
    console.log('📤 AuthInterceptor: Request headers:', clonedRequest.headers.keys());
    
    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ AuthInterceptor: Error en request:', error);
        if (error.status === 401) {
          console.log('🚪 AuthInterceptor: Token inválido, cerrando sesión');
          authService.logout();
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  } else {
    console.log('⚠️ AuthInterceptor: No hay token, enviando request sin Authorization');
    return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ AuthInterceptor: Error en request sin token:', error);
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
};

// Mantener la clase por compatibilidad si es necesaria
import { Injectable } from '@angular/core';
import { 
  HttpInterceptor,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log('🔐 AuthInterceptor (clase): Interceptando request a:', request.url);
    
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }
    
    return next.handle(request);
  }
}