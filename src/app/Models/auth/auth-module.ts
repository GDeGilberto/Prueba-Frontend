import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class AuthModule { }

export interface LoginRequest {
  email: string;
  contraseña: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  nombreUsuario: string;
  token: string;
}

export interface User {
  id: number;
  email: string;
  nombreUsuario: string;
}