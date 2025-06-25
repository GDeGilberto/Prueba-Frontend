import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Environments/enviroment';

interface Stats {
  sesionesActivas: number;
  actividadDiaria: number;
  notificaciones: number;
  tareasCompletadas: number;
}

interface Activity {
  id: string;
  description: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any = null;
  currentDate = new Date();
  stats: Stats = {
    sesionesActivas: 1,
    actividadDiaria: 8,
    notificaciones: 3,
    tareasCompletadas: 12
  };
  recentActivity: Activity[] = [
    {
      id: '1',
      description: 'Inicio de sesión exitoso',
      timestamp: new Date()
    },
    {
      id: '2',
      description: 'Perfil actualizado',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
    },
    {
      id: '3',
      description: 'Configuración guardada',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
    }
  ];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        console.log('👤 Usuario cargado:', this.user);
      } catch (error) {
        console.error('❌ Error al parsear datos del usuario:', error);
        this.logout();
      }
    } else {
      console.warn('⚠️ No se encontraron datos del usuario');
      this.logout();
    }
  }

  viewProfile(): void {
    console.log('👤 Ver perfil del usuario');
    // Aquí se implementaría la navegación al perfil
    alert('Funcionalidad de perfil en desarrollo');
  }

  viewSettings(): void {
    console.log('⚙️ Ver configuraciones');
    // Aquí se implementaría la navegación a configuraciones
    alert('Funcionalidad de configuraciones en desarrollo');
  }

  viewReports(): void {
    console.log('📊 Ver reportes');
    // Aquí se implementaría la navegación a reportes
    alert('Funcionalidad de reportes en desarrollo');
  }

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    // Limpiar datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  // TrackBy function para optimizar *ngFor
  trackByActivityId(index: number, activity: Activity): string {
    return activity.id;
  }

  // Método para mostrar preview del token (opcional, para debugging)
  getTokenPreview(): string {
    const token = localStorage.getItem('token');
    if (token && token.length > 20) {
      return `${token.substring(0, 10)}...${token.substring(token.length - 10)}`;
    }
    return token || 'No disponible';
  }
}
