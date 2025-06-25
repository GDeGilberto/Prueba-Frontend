import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Bienvenido, {{ userName }}</span>
          <button (click)="logout()" class="logout-btn">Cerrar sesión</button>
        </div>
      </header>
      <main class="dashboard-content">
        <p>Contenido del Dashboard</p>
        <!-- Aquí puedes añadir el contenido específico de tu dashboard -->
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .logout-btn {
      padding: 8px 16px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .logout-btn:hover {
      background-color: #c82333;
    }
    
    .dashboard-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(
    private router: Router,
    private authService: Auth
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.name) {
      this.userName = user.name;
    } else {
      this.userName = 'Usuario';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
