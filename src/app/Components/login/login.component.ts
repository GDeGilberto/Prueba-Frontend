import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { environment } from '../../Environments/enviroment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Verificar si ya está autenticado
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  fillTestData(): void {
    this.loginForm.patchValue({
      email: 'usuario@test.com',
      contraseña: 'Usuario!90'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const credentials = this.loginForm.value;

    this.http.post(`${environment.apiUrl}/Usuario/login`, credentials)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response: any) => {
          console.log('✅ Login exitoso:', response);
          this.successMessage = '¡Login exitoso! Redirigiendo...';
          
          // Guardar datos de usuario
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
          
          // Redirigir después de mostrar el mensaje
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          console.error('❌ Error en login:', error);
          
          if (error.status === 0) {
            this.errorMessage = 'No se puede conectar al servidor. Verifica que la API esté corriendo.';
          } else if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
          } else if (error.status === 404) {
            this.errorMessage = 'Servicio no encontrado. Verifica la configuración de la API.';
          } else {
            this.errorMessage = error.error?.message || 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
