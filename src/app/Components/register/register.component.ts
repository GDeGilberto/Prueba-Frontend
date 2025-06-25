import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  
  sexoOptions = [
    { value: 0, label: 'Masculino' },
    { value: 1, label: 'Femenino' }
  ];
  
  constructor() {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', [
        Validators.required, 
        Validators.minLength(7),
        this.alphanumericValidator
      ]],
      contraseña: ['', [
        Validators.required, 
        Validators.minLength(10),
        this.passwordStrengthValidator
      ]],
      confirmarContraseña: ['', Validators.required],
      sexo: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  } 

  // Validador personalizado para caracteres alfanuméricos
  alphanumericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(value)) {
      return { alphanumeric: true };
    }
    return null;
  }

  // Validador para contraseña fuerte
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSymbol;

    if (!passwordValid) {
      return { 
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          hasSymbol
        }
      };
    }
    return null;
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmarContraseña');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Limpiar el error si las contraseñas coinciden
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    return null;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const formData = this.registerForm.value;
    const registerData = {
      email: formData.email,
      nombreUsuario: formData.nombreUsuario,
      contraseña: formData.contraseña,
      confirmarContraseña: formData.confirmarContraseña,
      sexo: parseInt(formData.sexo)
    };

    this.authService.register(registerData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Registro exitoso. Redirigiendo al login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error: any) => {
          this.errorMessage = error.message || 'Error al registrar usuario. Inténtalo de nuevo.';
        }
      });
  }
}
