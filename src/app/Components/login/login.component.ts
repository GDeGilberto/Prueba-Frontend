import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';

// Definimos una interfaz para el formulario de login
interface LoginFormControls {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginFormControls>;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: Auth
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario con validaciones
    this.loginForm = this.formBuilder.group<LoginFormControls>({
      username: new FormControl('', { validators: Validators.required, nonNullable: true }),
      password: new FormControl('', { validators: Validators.required, nonNullable: true })
    });
    
    // Redirigir si el usuario ya está logueado
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Getter para facilitar acceso a los campos del formulario
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    // Asegurarnos de que los valores nunca sean null
    const username = this.f.username.value || '';
    const password = this.f.password.value || '';

    this.authService.login({
      username,
      password
    }).subscribe({
      next: (response) => {
        if (response.success) {
          // Navegación exitosa al dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Mensaje de error desde la API
          this.error = response.message || 'Credenciales incorrectas';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Ha ocurrido un error al intentar iniciar sesión. Por favor, intente nuevamente más tarde.';
        console.error('Error de login:', error);
        this.loading = false;
      }
    });
  }
}
