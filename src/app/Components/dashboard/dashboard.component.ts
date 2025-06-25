import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="navbar">
        <h1>Dashboard</h1>
        <button (click)="logout()" class="btn btn-outline-danger">Cerrar Sesión</button>
      </nav>
      <div class="content">
        <h2>¡Bienvenido!</h2>
        <p>Has iniciado sesión exitosamente.</p>
        <div *ngIf="user">
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Usuario:</strong> {{ user.nombreUsuario }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    
    .navbar {
      background-color: #fff;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .content {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: 1px solid #dc3545;
      background: transparent;
      color: #dc3545;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class DashboardComponent {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
