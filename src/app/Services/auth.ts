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
    return this.http.post<LoginResponse>(`${this.apiUrl}/Usuario/login`, credentials)
      .pipe(
        tap(response => {
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
          return throwError(() => new Error(error.error || 'Error en el inicio de sesion'));
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Usuario`, userData)
      .pipe(
        tap(response => {
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error al registrar usuario'));
        })
      );
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Usuario`)
      .pipe(
        tap(response => {
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error al obtener usuarios'));
        })
      );
  }

  updateUsuarioEstatus(id: number, estatus: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Usuario/${id}/estatus`, { estatus })
      .pipe(
        tap(response => {
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error al actualizar usuario'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
