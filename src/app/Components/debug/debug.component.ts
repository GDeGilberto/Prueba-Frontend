import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border: 2px solid #ccc;">
      <h1>🔍 Página de Debug</h1>
      
      <div style="margin: 10px 0;">
        <h3>Rutas disponibles:</h3>
        <ul>
          <li><a href="/test" style="color: blue;">Test Component</a></li>
          <li><a href="/login" style="color: blue;">Login Component</a></li>
          <li><a href="/login-simple" style="color: blue;">Login Simple</a></li>
          <li><a href="/dashboard" style="color: blue;">Dashboard (requiere auth)</a></li>
        </ul>
      </div>

      <div style="margin: 20px 0;">
        <h3>Estado de la aplicación:</h3>
        <p><strong>URL actual:</strong> {{ getCurrentUrl() }}</p>
        <p><strong>Navegador:</strong> {{ getUserAgent() }}</p>
      </div>

      <div style="margin: 20px 0; padding: 10px; background: lightyellow; border: 1px solid orange;">
        <h3>⚠️ Instrucciones de debug:</h3>
        <p>1. Abre las herramientas de desarrollador (F12)</p>
        <p>2. Ve a la pestaña Console</p>
        <p>3. Haz clic en "Login Component" arriba</p>
        <p>4. ¿Ves el mensaje "🎯 Componente Login cargado correctamente!" en la consola?</p>
        <p>5. ¿Hay errores en rojo en la consola?</p>
      </div>
    </div>
  `
})
export class DebugComponent {
  getCurrentUrl() {
    return window.location.href;
  }

  getUserAgent() {
    return navigator.userAgent;
  }
}
