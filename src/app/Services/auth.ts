import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../Environments/enviroment';
import { LoginRequest, LoginResponse, User } from '../Models/auth/auth-module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('🚀 AuthService: Enviando request a:', `${this.apiUrl}/Usuario/login`);
    console.log('📝 AuthService: Payload:', credentials);
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/Usuario/login`, credentials)
      .pipe(
        tap(response => {
          console.log('✅ AuthService: Respuesta exitosa:', response);
          localStorage.setItem('token', response.token);
          const user: User = {
            id: response.id,
            email: response.email,
            nombreUsuario: response.nombreUsuario
          };
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('❌ AuthService: Error en login:', error);
          console.error('❌ AuthService: Status:', error.status);
          console.error('❌ AuthService: Error body:', error.error);
          return throwError(() => new Error(error.error || 'Error en el inicio de sesion'));
        })
      );
  }

  register(userData: any): Observable<any> {
    console.log('🚀 AuthService: Enviando request de registro a:', `${this.apiUrl}/Usuario`);
    console.log('📝 AuthService: Payload:', userData);
    
    return this.http.post<any>(`${this.apiUrl}/Usuario`, userData)
      .pipe(
        tap(response => {
          console.log('✅ AuthService: Usuario registrado exitosamente:', response);
        }),
        catchError(error => {
          console.error('❌ AuthService: Error en registro:', error);
          console.error('❌ AuthService: Status:', error.status);
          console.error('❌ AuthService: Error body:', error.error);
          return throwError(() => new Error(error.error?.message || 'Error al registrar usuario'));
        })
      );
  }

  getUsuarios(): Observable<any[]> {
    const token = this.getToken();
    console.log('🚀 AuthService: Obteniendo usuarios de:', `${this.apiUrl}/Usuario`);
    console.log('🔑 AuthService: Token disponible:', !!token);
    console.log('🔑 AuthService: Token (primeros 50 chars):', token ? token.substring(0, 50) + '...' : 'No token');
    
    return this.http.get<any[]>(`${this.apiUrl}/Usuario`)
      .pipe(
        tap(response => {
          console.log('✅ AuthService: Usuarios obtenidos exitosamente:', response);
        }),
        catchError(error => {
          console.error('❌ AuthService: Error obteniendo usuarios:', error);
          console.error('❌ AuthService: Status:', error.status);
          console.error('❌ AuthService: Error body:', error.error);
          console.error('❌ AuthService: Headers:', error.headers);
          return throwError(() => new Error(error.error?.message || 'Error al obtener usuarios'));
        })
      );
  }

  updateUsuarioEstatus(id: number, estatus: number): Observable<any> {
    console.log('🚀 AuthService: Actualizando estatus del usuario:', id, 'a:', estatus);
    
    return this.http.put<any>(`${this.apiUrl}/Usuario/${id}/estatus`, { estatus })
      .pipe(
        tap(response => {
          console.log('✅ AuthService: Estatus actualizado exitosamente:', response);
        }),
        catchError(error => {
          console.error('❌ AuthService: Error actualizando estatus:', error);
          return throwError(() => new Error(error.error?.message || 'Error al actualizar usuario'));
        })
      );
  }

  logout(): void {
    console.log('🚪 AuthService: Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('✅ AuthService: Sesión cerrada exitosamente');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    console.log('🔐 AuthService: Verificando autenticación:', { token: !!token, isAuthenticated });
    return isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
