import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../Services/auth';
import { Usuario, UsuarioTableData, UsuarioEstatus, UsuarioSexo } from '../../Models/usuario/usuario.model';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nombreUsuario', 'email', 'sexo', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<UsuarioTableData>();
  usuarios: Usuario[] = [];
  loading = false;
  currentUser$ = this.authService.currentUser$;
  
  // Filtros
  filtroEstatus: string = 'todos';
  filtroTexto: string = '';

  estatusOptions = [
    { value: 'todos', label: 'Todos los usuarios' },
    { value: '1', label: 'Activos' },
    { value: '0', label: 'Inactivos' }
  ];

  ngOnInit(): void {
    console.log('🎯 Dashboard: Componente inicializado');
    console.log('🔐 Dashboard: Usuario actual:', this.authService.currentUserValue);
    this.loadUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Configurar filtro personalizado
    this.dataSource.filterPredicate = this.createFilter();
  }

  loadUsuarios(): void {
    console.log('📊 Dashboard: Cargando usuarios...');
    this.loading = true;
    this.authService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        console.log('✅ Dashboard: Usuarios recibidos:', usuarios);
        this.usuarios = usuarios;
        this.updateDataSource();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('❌ Dashboard: Error cargando usuarios:', error);
        console.log('Error al cargar usuarios');
        this.loading = false;
      }
    });
  }

  updateDataSource(): void {
    const tableData: UsuarioTableData[] = this.usuarios.map(usuario => ({
      ...usuario,
      estatusText: usuario.estatus === UsuarioEstatus.Activo ? 'Activo' : 'Inactivo',
      sexoText: usuario.sexo === UsuarioSexo.Masculino ? 'Masculino' : 'Femenino'
    }));
    
    this.dataSource.data = tableData;
    this.applyFilters();
  }

  createFilter(): (data: UsuarioTableData, filter: string) => boolean {
    return (data: UsuarioTableData, filter: string): boolean => {
      const filterObj = JSON.parse(filter);
      
      // Filtro por estatus
      if (filterObj.estatus !== 'todos' && data.estatus.toString() !== filterObj.estatus) {
        return false;
      }
      
      // Filtro por texto
      if (filterObj.texto) {
        const searchText = filterObj.texto.toLowerCase();
        return data.nombreUsuario.toLowerCase().includes(searchText) ||
               data.email.toLowerCase().includes(searchText) ||
               data.sexoText.toLowerCase().includes(searchText) ||
               data.estatusText.toLowerCase().includes(searchText);
      }
      
      return true;
    };
  }

  applyFilters(): void {
    const filterValue = JSON.stringify({
      estatus: this.filtroEstatus,
      texto: this.filtroTexto
    });
    this.dataSource.filter = filterValue;
  }

  onFiltroEstatusChange(): void {
    this.applyFilters();
  }

  onFiltroTextoChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.filtroEstatus = 'todos';
    this.filtroTexto = '';
    this.applyFilters();
  }

  editarUsuario(usuario: UsuarioTableData): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Implementar actualización del usuario cuando esté disponible la API
        console.log('Usuario actualizado:', result);
        console.log('Usuario actualizado exitosamente');
        this.loadUsuarios(); // Recargar la tabla
      }
    });
  }

  eliminarUsuario(usuario: UsuarioTableData): void {
    const nuevoEstatus = usuario.estatus === UsuarioEstatus.Activo ? UsuarioEstatus.Inactivo : UsuarioEstatus.Activo;
    const accion = nuevoEstatus === UsuarioEstatus.Activo ? 'activar' : 'inactivar';
    
    if (confirm(`¿Estás seguro de que quieres ${accion} al usuario ${usuario.nombreUsuario}?`)) {
      this.authService.updateUsuarioEstatus(usuario.id, nuevoEstatus).subscribe({
        next: () => {
          console.log(`Usuario ${accion === 'activar' ? 'activado' : 'inactivado'} exitosamente`);
          this.loadUsuarios(); // Recargar la tabla
        },
        error: (error: any) => {
          console.error('Error actualizando usuario:', error);
          console.log('Error al actualizar usuario');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTotalUsuarios(): number {
    return this.dataSource.filteredData.length;
  }

  getUsuariosActivos(): number {
    return this.dataSource.filteredData.filter(u => u.estatus === UsuarioEstatus.Activo).length;
  }

  getUsuariosInactivos(): number {
    return this.dataSource.filteredData.filter(u => u.estatus === UsuarioEstatus.Inactivo).length;
  }
}
