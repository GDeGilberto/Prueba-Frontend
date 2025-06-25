import { Component } from '@angular/core';

@Component({
  selector: 'app-login-simple',
  standalone: true,
  template: `
    <div style="padding: 20px; background: lightgreen; margin: 20px;">
      <h1>🔐 Login Simple</h1>
      <p>Este es el componente de login simplificado.</p>
      <div>
        <input type="email" placeholder="Email" style="padding: 10px; margin: 5px; width: 200px;">
        <br>
        <input type="password" placeholder="Contraseña" style="padding: 10px; margin: 5px; width: 200px;">
        <br>
        <button style="padding: 10px 20px; margin: 5px; background: blue; color: white; border: none;">
          Iniciar Sesión
        </button>
      </div>
    </div>
  `
})
export class LoginSimpleComponent {}
