import { Routes } from '@angular/router';
import { Login } from './Components/login/login/login';
import { LoginSimpleComponent } from './Components/login/login-simple.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TestComponent } from './Components/test/test.component';
import { DebugComponent } from './Components/debug/debug.component';
import { authGuard } from './Guard/auth-guard';

export const routes: Routes = [
  { path: 'debug', component: DebugComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: Login },
  { path: 'login-simple', component: LoginSimpleComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/debug', pathMatch: 'full' },
  { path: '**', redirectTo: '/debug' }
];
