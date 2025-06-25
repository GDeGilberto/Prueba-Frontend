import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Importar componentes
import { WorkingLoginComponent } from './Components/login/working-login.component';
import { SimpleDashboardComponent } from './Components/dashboard/simple-dashboard.component';

@Component({
  selector: 'app-basic-home',
  standalone: true,
  template: `
    <div style="max-width: 600px; margin: 50px auto; padding: 20px; text-align: center;">
      <h1 style="color: #28a745;">🎉 ¡Angular está funcionando!</h1>
      <p style="font-size: 18px; margin: 20px 0;">Las rutas están configuradas correctamente.</p>
      
      <div style="margin: 30px 0;">
        <a href="/login" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">
          🔐 Ir al Login (API Conectada)
        </a>
        <a href="/dashboard" style="display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">
          📊 Dashboard
        </a>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <h3>📋 URLs disponibles:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>🏠 <code>/</code> - Esta página</li>
          <li>🔐 <code>/login</code> - Login con API conectada</li>
          <li>📊 <code>/dashboard</code> - Dashboard después del login</li>
        </ul>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #d1ecf1; border-radius: 5px;">
        <h4>🔧 Datos de prueba para el login:</h4>
        <p><strong>Email:</strong> usuario&#64;test.com</p>
        <p><strong>Contraseña:</strong> Usuario!90</p>
        <p><strong>API:</strong> https://localhost:7007/api/Usuario/login</p>
      </div>
    </div>
  `
})
export class BasicHomeComponent {}

export const routes: Routes = [
  { path: '', component: BasicHomeComponent },
  { path: 'login', component: WorkingLoginComponent },
  { path: 'dashboard', component: SimpleDashboardComponent },
  { path: '**', redirectTo: '' }
];
