import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 800px; margin: 50px auto; padding: 30px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 2.5rem;">🎉 ¡Bienvenido!</h1>
        <p style="margin: 10px 0; font-size: 1.2rem;">Login exitoso</p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">📊 Dashboard</h2>
        
        <div *ngIf="user" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #495057; margin-bottom: 15px;">👤 Información del Usuario:</h3>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Nombre de Usuario:</strong> {{ user.nombreUsuario }}</p>
          <p><strong>Token:</strong> {{ user.token?.substring(0, 50) }}...</p>
        </div>

        <div style="margin-top: 30px;">
          <button 
            (click)="logout()"
            style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            🚪 Cerrar Sesión
          </button>
          <button 
            (click)="testApiCall()"
            style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-left: 10px;">
            🧪 Probar API
          </button>
        </div>

        <div *ngIf="apiTestResult" style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px;">
          <h4>🔍 Resultado del test de API:</h4>
          <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">{{ apiTestResult }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    button:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      transition: all 0.3s ease;
    }
  `]
})
export class SimpleDashboardComponent implements OnInit {
  user: any = null;
  apiTestResult: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar información del usuario desde localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.user = JSON.parse(userStr);
      console.log('👤 Usuario cargado:', this.user);
    } else {
      console.log('❌ No hay usuario en localStorage, redirigiendo al login');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    console.log('🚪 Sesión cerrada');
    this.router.navigate(['/login']);
  }

  testApiCall(): void {
    const token = localStorage.getItem('token');
    this.apiTestResult = `Token disponible: ${token ? 'Sí' : 'No'}
Token: ${token?.substring(0, 100)}...
Usuario: ${JSON.stringify(this.user, null, 2)}`;
  }
}
