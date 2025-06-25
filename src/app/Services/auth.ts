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


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
