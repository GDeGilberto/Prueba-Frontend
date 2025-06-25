import { Routes } from '@angular/router';

// Componente básico de bienvenida
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>🏠 Página de Inicio</h1>
      <p>Esta es la página principal de la aplicación.</p>
      <div style="margin: 20px;">
        <a href="/login" style="padding: 10px 20px; background: blue; color: white; text-decoration: none; margin: 5px; display: inline-block;">
          Ir al Login
        </a>
        <a href="/debug" style="padding: 10px 20px; background: green; color: white; text-decoration: none; margin: 5px; display: inline-block;">
          Página de Debug
        </a>
      </div>
    </div>
  `
})
export class HomeComponent {}

// Importar componentes existentes
import { Login } from './Components/login/login/login';
import { DebugComponent } from './Components/debug/debug.component';
import { TestComponent } from './Components/test/test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'debug', component: DebugComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
