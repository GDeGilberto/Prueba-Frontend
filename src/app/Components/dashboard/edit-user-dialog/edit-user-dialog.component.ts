import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioTableData, UsuarioEstatus, UsuarioSexo } from '../../../Models/usuario/usuario.model';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>edit</mat-icon>
      Editar Usuario
    </h2>
    
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="dialog-content">
        <div class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Nombre de Usuario</mat-label>
            <input matInput formControlName="nombreUsuario" placeholder="Ingrese el nombre de usuario">
            <mat-error *ngIf="editForm.get('nombreUsuario')?.hasError('required')">
              El nombre de usuario es requerido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" placeholder="usuario@ejemplo.com">
            <mat-error *ngIf="editForm.get('email')?.hasError('required')">
              El email es requerido
            </mat-error>
            <mat-error *ngIf="editForm.get('email')?.hasError('email')">
              Ingrese un email válido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Sexo</mat-label>
            <mat-select formControlName="sexo">
              <mat-option [value]="0">Masculino</mat-option>
              <mat-option [value]="1">Femenino</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Estado</mat-label>
            <mat-select formControlName="estatus">
              <mat-option [value]="1">Activo</mat-option>
              <mat-option [value]="0">Inactivo</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button type="button" (click)="onCancel()">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="editForm.invalid || isLoading">
          <mat-icon>save</mat-icon>
          {{ isLoading ? 'Guardando...' : 'Guardar' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .dialog-content {
      min-width: 400px;
      padding: 16px 0;
    }

    .form-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr;
    }

    .form-grid mat-form-field {
      width: 100%;
    }

    .dialog-actions {
      padding: 16px 0;
      gap: 12px;
    }

    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0;
    }

    @media (max-width: 600px) {
      .dialog-content {
        min-width: 300px;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EditUserDialogComponent {
  editForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioTableData
  ) {
    this.editForm = this.fb.group({
      nombreUsuario: [data.nombreUsuario, [Validators.required, Validators.minLength(3)]],
      email: [data.email, [Validators.required, Validators.email]],
      sexo: [data.sexo, [Validators.required]],
      estatus: [data.estatus, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isLoading = true;
      const formValue = this.editForm.value;
      
      const updatedUser: Partial<UsuarioTableData> = {
        id: this.data.id,
        nombreUsuario: formValue.nombreUsuario,
        email: formValue.email,
        sexo: formValue.sexo,
        estatus: formValue.estatus,
        sexoText: formValue.sexo === UsuarioSexo.Masculino ? 'Masculino' : 'Femenino',
        estatusText: formValue.estatus === UsuarioEstatus.Activo ? 'Activo' : 'Inactivo'
      };

      this.dialogRef.close(updatedUser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
