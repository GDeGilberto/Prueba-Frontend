import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-working-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 400px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; margin-bottom: 30px; color: #333;">🔐 Iniciar Sesión</h2>
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <!-- Campo Email -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email:</label>
          <input 
            type="email" 
            formControlName="email"
            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;"
            [style.border-color]="loginForm.get('email')?.touched && loginForm.get('email')?.errors ? '#dc3545' : '#ddd'"
            placeholder="usuario@test.com"
          />
          <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors" 
               style="color: #dc3545; font-size: 14px; margin-top: 5px;">
            <div *ngIf="loginForm.get('email')?.errors?.['required']">Email es requerido</div>
            <div *ngIf="loginForm.get('email')?.errors?.['email']">Email debe ser válido</div>
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Contraseña:</label>
          <input 
            type="password" 
            formControlName="contraseña"
            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;"
            [style.border-color]="loginForm.get('contraseña')?.touched && loginForm.get('contraseña')?.errors ? '#dc3545' : '#ddd'"
            placeholder="Usuario!90"
          />
          <div *ngIf="loginForm.get('contraseña')?.touched && loginForm.get('contraseña')?.errors" 
               style="color: #dc3545; font-size: 14px; margin-top: 5px;">
            <div *ngIf="loginForm.get('contraseña')?.errors?.['required']">Contraseña es requerida</div>
          </div>
        </div>

        <!-- Mensaje de Error -->
        <div *ngIf="errorMessage" 
             style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #f5c6cb;">
          {{ errorMessage }}
        </div>

        <!-- Mensaje de Éxito -->
        <div *ngIf="successMessage" 
             style="background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
          {{ successMessage }}
        </div>

        <!-- Botón Submit -->
        <button 
          type="submit"
          [disabled]="loading || loginForm.invalid"
          style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;"
          [style.background]="loading || loginForm.invalid ? '#6c757d' : '#007bff'"
          [style.cursor]="loading || loginForm.invalid ? 'not-allowed' : 'pointer'"
        >
          <span *ngIf="loading">🔄 Iniciando sesión...</span>
          <span *ngIf="!loading">Iniciar Sesión</span>
        </button>
      </form>

      <!-- Info de Debug -->
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">
        <h4>🧪 Datos de prueba:</h4>
        <p><strong>Email:</strong> usuario&#64;test.com</p>
        <p><strong>Contraseña:</strong> Usuario!90</p>
        <p><strong>API:</strong> https://localhost:7007/api/Usuario/login</p>
      </div>

      <!-- Logs de Debug -->
      <div *ngIf="debugLogs.length > 0" style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 4px; max-height: 200px; overflow-y: auto;">
        <h4>📋 Logs de Debug:</h4>
        <div *ngFor="let log of debugLogs" style="font-family: monospace; font-size: 12px; margin: 2px 0;">
          {{ log }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    input:focus {
      outline: none;
      border-color: #007bff !important;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
    button:hover:not(:disabled) {
      background: #0056b3 !important;
    }
  `]
})
export class WorkingLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  debugLogs: string[] = [];

  private apiUrl = 'https://localhost:7007/api';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.addDebugLog('🎯 Componente WorkingLogin inicializado');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['usuario@test.com', [Validators.required, Validators.email]],
      contraseña: ['Usuario!90', [Validators.required]]
    });
    
    this.addDebugLog('📝 Formulario creado con datos de prueba');
  }

  addDebugLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.debugLogs.push(`[${timestamp}] ${message}`);
    console.log(`🔍 LOGIN DEBUG: ${message}`);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.addDebugLog('❌ Formulario inválido');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const credentials = this.loginForm.value;
    this.addDebugLog(`🚀 Enviando request a: ${this.apiUrl}/Usuario/login`);
    this.addDebugLog(`📤 Payload: ${JSON.stringify(credentials)}`);

    this.http.post(`${this.apiUrl}/Usuario/login`, credentials)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response: any) => {
          this.addDebugLog(`✅ Respuesta exitosa: ${JSON.stringify(response)}`);
          this.successMessage = '¡Login exitoso! Redirigiendo...';
          
          // Guardar token y usuario en localStorage
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.addDebugLog('💾 Token y usuario guardados en localStorage');
          }
          
          // Redirigir después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.addDebugLog(`❌ Error: ${JSON.stringify(error)}`);
          this.addDebugLog(`❌ Status: ${error.status}`);
          this.addDebugLog(`❌ Error body: ${JSON.stringify(error.error)}`);
          
          if (error.status === 0) {
            this.errorMessage = 'No se puede conectar al servidor. Verifica que la API esté corriendo en https://localhost:7007';
          } else if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Verifica email y contraseña.';
          } else if (error.status === 404) {
            this.errorMessage = 'Endpoint no encontrado. Verifica la URL de la API.';
          } else {
            this.errorMessage = error.error?.message || 'Error en el servidor';
          }
        }
      });
  }
}
