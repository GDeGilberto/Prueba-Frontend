import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../Models/auth/auth-module';

/**
 * Servicio mock para testing del login sin backend
 * 
 * Para usar este servicio en lugar del real:
 * 1. Importar este servicio en lugar de AuthService
 * 2. O modificar temporalmente el auth.ts para usar estos métodos
 */
@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  
  // Usuarios mock para testing
  private mockUsers = [
    {
      email: 'admin@test.com',
      contraseña: '123456',
      response: {
        id: 1,
        email: 'admin@test.com',
        nombreUsuario: 'Administrador',
        token: 'mock-admin-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      }
    },
    {
      email: 'user@test.com', 
      contraseña: 'password',
      response: {
        id: 2,
        email: 'user@test.com',
        nombreUsuario: 'Usuario Test',
        token: 'mock-user-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      }
    }
  ];

  /**
   * Simula una llamada de login al backend
   * @param credentials - Email y contraseña del usuario
   * @returns Observable con la respuesta del login o error
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('🧪 MockAuthService: Simulando login...', credentials);
    
    // Simular delay de red
    return of(null).pipe(
      delay(1500), // 1.5 segundos para simular latencia
      // Luego evaluar las credenciales
      switchMap(() => {
        const user = this.mockUsers.find(u => 
          u.email === credentials.email && u.contraseña === credentials.contraseña
        );

        if (user) {
          console.log('✅ MockAuthService: Login exitoso', user.response);
          return of(user.response);
        } else {
          console.log('❌ MockAuthService: Credenciales inválidas');
          return throwError(() => ({ 
            error: 'Credenciales inválidas. Prueba con: admin@test.com / 123456' 
          }));
        }
      })
    );
  }

  /**
   * Para usar este mock service temporalmente:
   * 
   * 1. En auth.ts, reemplaza temporalmente el método login:
   * 
   * ```typescript
   * login(credentials: LoginRequest): Observable<LoginResponse> {
   *   // Comentar la llamada HTTP real:
   *   // return this.http.post<LoginResponse>(`${this.apiUrl}/Usuario/login`, credentials)
   *   
   *   // Usar el mock:
   *   return this.mockLogin(credentials);
   * }
   * 
   * private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
   *   const mockUsers = [
   *     { email: 'admin@test.com', contraseña: '123456', id: 1, nombreUsuario: 'Admin' },
   *     { email: 'user@test.com', contraseña: 'password', id: 2, nombreUsuario: 'User' }
   *   ];
   *   
   *   return of(null).pipe(
   *     delay(1000),
   *     switchMap(() => {
   *       const user = mockUsers.find(u => 
   *         u.email === credentials.email && u.contraseña === credentials.contraseña
   *       );
   *       
   *       if (user) {
   *         return of({
   *           id: user.id,
   *           email: user.email,
   *           nombreUsuario: user.nombreUsuario,
   *           token: `mock-token-${user.id}`
   *         });
   *       } else {
   *         return throwError(() => ({ error: 'Credenciales inválidas' }));
   *       }
   *     })
   *   );
   * }
   * ```
   * 
   * 2. Usuarios de prueba disponibles:
   *    - admin@test.com / 123456
   *    - user@test.com / password
   */
}

// Importaciones necesarias para el código de ejemplo
import { switchMap } from 'rxjs/operators';
